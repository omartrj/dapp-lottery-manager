const contractAddress = "0x70D7C0F6f1E95abBC600cfA037c0479aF85E7f05";
const contractJsonInterface = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "lotteryHash",
                "type": "bytes32"
            }
        ],
        "name": "LotteryCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "lotteryHash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "manager",
                "type": "address"
            }
        ],
        "name": "LotteryCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "lotteryHash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "prize",
                "type": "uint256"
            }
        ],
        "name": "LotteryEnded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "lotteryHash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "tickets",
                "type": "uint8"
            }
        ],
        "name": "TicketBought",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_lotteryHash",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "_tickets",
                "type": "uint8"
            }
        ],
        "name": "buyTickets",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_lotteryHash",
                "type": "bytes32"
            }
        ],
        "name": "cancelLottery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_ticketPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "name": "createLottery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_lotteryHash",
                "type": "bytes32"
            }
        ],
        "name": "getLottery",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "lotteryHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "prizePool",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum LotteryManager.State",
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "winner",
                        "type": "address"
                    }
                ],
                "internalType": "struct LotteryManager.Lottery",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserLotteries",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "lotteryHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "prizePool",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum LotteryManager.State",
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "winner",
                        "type": "address"
                    }
                ],
                "internalType": "struct LotteryManager.Lottery[]",
                "name": "created",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "lotteryHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "prizePool",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum LotteryManager.State",
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "winner",
                        "type": "address"
                    }
                ],
                "internalType": "struct LotteryManager.Lottery[]",
                "name": "entered",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_lotteryHash",
                "type": "bytes32"
            }
        ],
        "name": "selectWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];