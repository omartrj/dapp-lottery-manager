# LotteryManager

A lottery dApp that allows users to create and manage lotteries. Users can also buy more than one ticket for as many lotteries as they want. The winner is selected randomly and receives 90% of the prize pool, the manager receives the rest.

## Contract
LotteryManager : contracts/LotteryManager.sol

 --- 
## Modifiers:
### onlyManager

```solidity
modifier onlyManager(bytes32 _lotteryHash)
```

Modifier to check if the sender is the manager of a lottery

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

### onlyActive

```solidity
modifier onlyActive(bytes32 _lotteryHash)
```

Modifier to check if a lottery is active

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

### lotteryOpen

```solidity
modifier lotteryOpen(bytes32 _lotteryHash)
```

Modifier to check if a lottery is open

_A lottery is open if the current timestamp is less than the end timestamp and the state is ACTIVE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

### lotteryClosed

```solidity
modifier lotteryClosed(bytes32 _lotteryHash)
```

Modifier to check if a lottery is closed

_A lottery is closed if the current timestamp is greater than or equal to the end timestamp and the state is ACTIVE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

 --- 
## Functions:
### createLottery

```solidity
function createLottery(uint256 _ticketPrice, uint256 _duration) external
```

Creates a new lottery

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ticketPrice | uint256 | The price of a ticket |
| _duration | uint256 | The duration of the lottery, in seconds |

### buyTickets

```solidity
function buyTickets(bytes32 _lotteryHash, uint8 _tickets) external payable
```

Buys tickets for a lottery

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |
| _tickets | uint8 | The number of tickets to buy |

### selectWinner

```solidity
function selectWinner(bytes32 _lotteryHash) external
```

Ends a lottery and selects a winner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

### cancelLottery

```solidity
function cancelLottery(bytes32 _lotteryHash) external
```

Cancels a lottery

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

### getUserLotteries

```solidity
function getUserLotteries(address _user) external view returns (struct LotteryManager.Lottery[] created, struct LotteryManager.Lottery[] entered)
```

Returns the lotteries created and entered by an address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _user | address | The address of the user |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| created | struct LotteryManager.Lottery[] | The lotteries created by the user |
| entered | struct LotteryManager.Lottery[] | The lotteries entered by the user |

### getLottery

```solidity
function getLottery(bytes32 _lotteryHash) external view returns (struct LotteryManager.Lottery)
```

Returns the details of a lottery

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct LotteryManager.Lottery | lottery The details of the lottery |

### getPlayers

```solidity
function getPlayers(bytes32 _lotteryHash) external view returns (struct LotteryManager.Player[])
```

Returns the players of a lottery

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lotteryHash | bytes32 | The hash of the lottery |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct LotteryManager.Player[] | players The players of the lottery |

 --- 
## Events:
### LotteryCreated

```solidity
event LotteryCreated(bytes32 lotteryHash, address manager)
```

Emitted when a new lottery is created, with the hash of the lottery

### LotteryEnded

```solidity
event LotteryEnded(bytes32 lotteryHash, address winner, uint256 prize)
```

Emitted when a lottery ends

### LotteryCancelled

```solidity
event LotteryCancelled(bytes32 lotteryHash)
```

Emitted when a lottery is cancelled

### TicketBought

```solidity
event TicketBought(bytes32 lotteryHash, address player, uint8 tickets)
```

Emitted when a player buys tickets for a lottery

