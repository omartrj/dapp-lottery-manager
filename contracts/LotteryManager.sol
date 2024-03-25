// SPDX-License-Identifier: UNKNOWN 
pragma solidity ^0.8.0;

/// @title Lottery Manager dApp
/// @author Omar Criacci
/// @notice A lottery dApp that allows users to create and manage lotteries. Users can also buy more than one ticket for as many lotteries as they want. The winner is selected randomly and receives 90% of the prize pool, the manager receives the rest.
contract LotteryManager {

    /// @notice Struct to represent a lottery
    /// @param lotteryHash The hash of the lottery
    /// @param manager The manager of the lottery
    /// @param ticketPrice The price of a ticket
    /// @param ticketCount The number of tickets bought
    /// @param prizePool The prize pool, in wei
    /// @param startTimestamp The start timestamp of the lottery
    /// @param endTimestamp The end timestamp of the lottery
    /// @param state The state of the lottery
    /// @param winner The winner of the lottery
    struct Lottery {
        bytes32 lotteryHash;
        address manager;
        uint256 ticketPrice;
        uint256 ticketCount;
        uint256 prizePool;
        uint256 startTimestamp;
        uint256 endTimestamp;
        State state;
        address winner;
    }

    /// @notice Struct to represent a player
    /// @param addr The address of the player
    /// @param tickets The number of tickets bought (MAX: 255)
    struct Player {
        address addr;
        uint8 tickets;
    }

    /// @notice Struct to represent a list of lotteries
    /// @param created The lotteries created by the user
    /// @param entered The lotteries entered by the user
    struct LotteryList {
        bytes32[] created;
        bytes32[] entered;
    }

    /// @notice The state of a lottery
    /// @dev ACTIVE: The initial state of the lottery
    ///      ENDED: The lottery is over and a winner has been selected
    ///      CANCELLED: The lottery has been cancelled and players have been refunded
    enum State {ACTIVE, ENDED, CANCELLED}

    /// @notice All the lotteries created
    /// @dev The key is the hash of the lottery
    mapping(bytes32 => Lottery) private lotteries;

    /// @notice Players that bought tickets for a lottery
    /// @dev The key is the hash of the lottery
    mapping(bytes32 => Player[]) private players;

    /// @notice Lotteries created and entered by an address
    /// @dev The key is the address of the user
    mapping(address => LotteryList) private userLotteries;

    /// @notice The nonce used to generate random numbers
    /// @dev The nonce is incremented every time a external function is called
    uint256 private nonce = 0;


    /// @notice Emitted when a new lottery is created, with the hash of the lottery
    event LotteryCreated(bytes32 indexed lotteryHash, address indexed manager);

    /// @notice Emitted when a lottery ends
    event LotteryEnded(bytes32 indexed lotteryHash, address indexed winner, uint256 prize);

    /// @notice Emitted when a lottery is cancelled
    event LotteryCancelled(bytes32 indexed lotteryHash);

    /// @notice Emitted when a player buys tickets for a lottery
    event TicketBought(bytes32 indexed lotteryHash, address indexed player, uint8 tickets);

    /// @notice Creates a new lottery
    /// @param _ticketPrice The price of a ticket
    /// @param _duration The duration of the lottery, in seconds
    function createLottery(uint256 _ticketPrice, uint256 _duration) external {
        require(_ticketPrice > 0, "Ticket price must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        bytes32 lotteryHash = computeHash(msg.sender, _ticketPrice, block.timestamp, block.timestamp + _duration);
        require(lotteries[lotteryHash].manager == address(0), "Error while creating the lottery, try again");

        lotteries[lotteryHash] = Lottery({
            lotteryHash: lotteryHash,
            manager: msg.sender,
            ticketPrice: _ticketPrice,
            ticketCount: 0,
            prizePool: 0,
            startTimestamp: block.timestamp,
            endTimestamp: block.timestamp + _duration,
            state: State.ACTIVE,
            winner: address(0)
        });

        userLotteries[msg.sender].created.push(lotteryHash);

        emit LotteryCreated(lotteryHash, msg.sender);
        incrementNonce();
    }

    /// @notice Buys tickets for a lottery
    /// @param _lotteryHash The hash of the lottery
    /// @param _tickets The number of tickets to buy
    function buyTickets(bytes32 _lotteryHash, uint8 _tickets) external payable lotteryOpen(_lotteryHash) {
        require(_tickets > 0, "Number of tickets must be greater than 0");
        require(lotteries[_lotteryHash].manager != address(0), "This lottery does not exist");
        require(msg.value == lotteries[_lotteryHash].ticketPrice * _tickets, "Incorrect amount of ether sent");

        lotteries[_lotteryHash].ticketCount += _tickets;
        lotteries[_lotteryHash].prizePool += msg.value;

        players[_lotteryHash].push(Player({
            addr: msg.sender, 
            tickets: _tickets
        }));

        userLotteries[msg.sender].entered.push(_lotteryHash);

        emit TicketBought(_lotteryHash, msg.sender, _tickets);
        incrementNonce();
    }

    /// @notice Ends a lottery and selects a winner
    /// @param _lotteryHash The hash of the lottery
    function selectWinner(bytes32 _lotteryHash) external onlyManager(_lotteryHash) lotteryClosed(_lotteryHash) {
        require(lotteries[_lotteryHash].manager != address(0), "This lottery does not exist");  

        //If no one bought tickets, the lottery is cancelled
        if (lotteries[_lotteryHash].ticketCount == 0) {
            lotteries[_lotteryHash].state = State.CANCELLED;
            emit LotteryCancelled(_lotteryHash);
            incrementNonce();
            return;
        }

        //More tickets = more chances to win
        uint256 winningTicket = random() % lotteries[_lotteryHash].ticketCount;
        uint256 ticketCount = 0;
        for (uint256 i = 0; i < players[_lotteryHash].length; i++) {
            ticketCount += players[_lotteryHash][i].tickets;
            if (ticketCount > winningTicket) {
                lotteries[_lotteryHash].winner = players[_lotteryHash][i].addr;
                break;
            }
        }

        (uint256 managerPrize, uint256 winnerPrize) = dividePrizePool(lotteries[_lotteryHash].prizePool);

        payable(lotteries[_lotteryHash].manager).transfer(managerPrize);
        payable(lotteries[_lotteryHash].winner).transfer(winnerPrize);

        lotteries[_lotteryHash].state = State.ENDED;

        emit LotteryEnded(_lotteryHash, lotteries[_lotteryHash].winner, winnerPrize);
        incrementNonce();
    }

    /// @notice Cancels a lottery
    /// @param _lotteryHash The hash of the lottery
    function cancelLottery(bytes32 _lotteryHash) external onlyManager(_lotteryHash) onlyActive(_lotteryHash) {
        require(lotteries[_lotteryHash].manager != address(0), "This lottery does not exist");

        lotteries[_lotteryHash].state = State.CANCELLED;

        for (uint256 i = 0; i < players[_lotteryHash].length; i++) {
            address player = players[_lotteryHash][i].addr;
            uint8 tickets = players[_lotteryHash][i].tickets;
            payable(player).transfer(lotteries[_lotteryHash].ticketPrice * tickets);
        }

        emit LotteryCancelled(_lotteryHash);
        incrementNonce();
    }

    /// @notice Returns the lotteries created and entered by an address
    /// @param _user The address of the user
    /// @return created The lotteries created by the user
    /// @return entered The lotteries entered by the user
    function getUserLotteries(address _user) external view returns (Lottery[] memory created, Lottery[] memory entered) {
        created = new Lottery[](userLotteries[_user].created.length);
        entered = new Lottery[](userLotteries[_user].entered.length);

        for (uint256 i = 0; i < userLotteries[_user].created.length; i++) {
            created[i] = lotteries[userLotteries[_user].created[i]];
        }

        for (uint256 i = 0; i < userLotteries[_user].entered.length; i++) {
            entered[i] = lotteries[userLotteries[_user].entered[i]];
        }

        return (created, entered);
    }  

    /// @notice Returns the details of a lottery
    /// @param _lotteryHash The hash of the lottery
    /// @return lottery The details of the lottery
    function getLottery(bytes32 _lotteryHash) external view returns (Lottery memory) {
        return lotteries[_lotteryHash];
    }      

    /// @notice Returns the players of a lottery
    /// @param _lotteryHash The hash of the lottery
    /// @return players The players of the lottery
    function getPlayers(bytes32 _lotteryHash) external view returns (Player[] memory) {
        return players[_lotteryHash];
    }

    /// @notice Computes the hash of a lottery using SHA-256
    /// @param _manager The manager of the lottery
    /// @param _ticketPrice The price of a ticket
    /// @param _startTimestamp The start timestamp of the lottery
    /// @param _endTimestamp The end timestamp of the lottery
    /// @return lotteryHash The hash of the lottery
    function computeHash(address _manager, uint256 _ticketPrice, uint256 _startTimestamp, uint256 _endTimestamp) private pure returns (bytes32 lotteryHash) {
        return sha256(abi.encodePacked(_manager, _ticketPrice, _startTimestamp, _endTimestamp));
    }

    /// @notice Divides the prize pool between the manager and the winner
    /// @param _prizePool The prize pool
    /// @return managerPrize The manager's prize
    /// @return winnerPrize The winner's prize
    /// @dev The manager receives 10% of the prize pool, the winner receives the rest
    function dividePrizePool(uint256 _prizePool) private pure returns (uint256 managerPrize, uint256 winnerPrize) {
        managerPrize = _prizePool / 10;
        winnerPrize = _prizePool - managerPrize;
        return (managerPrize, winnerPrize);
    }

    /// @notice Increments the nonce
    /// @dev If the nonce is equal to 2^256 - 1, it is reset to 0 to avoid overflow
    function incrementNonce() private {
        if (nonce == 2**256 - 1) {
            nonce = 0;
        } else {
            nonce++;
        }
    }

    /// @notice Generate a random number
    /// @return rand The random number
    /// @dev The random number is generated using the current timestamp, the nonce and the sender's address
    function random() private view returns (uint256 rand) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, nonce, msg.sender)));
    }

    /// @notice Modifier to check if the sender is the manager of a lottery
    /// @param _lotteryHash The hash of the lottery
    modifier onlyManager(bytes32 _lotteryHash) {
        require(lotteries[_lotteryHash].manager == msg.sender, "You are not the manager of this lottery");
        _;
    }

    /// @notice Modifier to check if a lottery is active
    /// @param _lotteryHash The hash of the lottery
    modifier onlyActive(bytes32 _lotteryHash) {
        require(lotteries[_lotteryHash].state == State.ACTIVE, "Lottery is not active");
        _;
    }

    /// @notice Modifier to check if a lottery is open
    /// @param _lotteryHash The hash of the lottery
    /// @dev A lottery is open if the current timestamp is less than the end timestamp and the state is ACTIVE
    modifier lotteryOpen(bytes32 _lotteryHash) {
        require(
            block.timestamp < lotteries[_lotteryHash].endTimestamp &&
            lotteries[_lotteryHash].state == State.ACTIVE,
            "Lottery is closed"
        );
        _;
    }

    /// @notice Modifier to check if a lottery is closed
    /// @param _lotteryHash The hash of the lottery
    /// @dev A lottery is closed if the current timestamp is greater than or equal to the end timestamp and the state is ACTIVE
    modifier lotteryClosed(bytes32 _lotteryHash) {
        require(
            block.timestamp >= lotteries[_lotteryHash].endTimestamp &&
            lotteries[_lotteryHash].state == State.ACTIVE,
            "Lottery is still open"
        );
        _;
    }

}