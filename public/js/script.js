const testnet = "https://rpc2.sepolia.org/";
//const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
let web3 = new Web3(testnet);

//On change account
ethereum.on('accountsChanged', function (accounts) {
    if (accounts.length === 0) {
        logout();
    } else {
        login();
    }
});


const contractAddress = "0x34Ea18575951DD6cFfE02F60e5EdD924a52dA5B0";
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

const contract = new web3.eth.Contract(contractJsonInterface, contractAddress);

let currentAddress = null;

async function login() {
    showDialog({
        title: 'Login in progress',
        message: 'Please log in to your wallet and give permission to this website to access your account...',
        spinner: true,
    });
    // Request account access
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    currentAddress = accounts[0];
    // Refresh user lotteries
    await refreshUserLotteries();
    // Update UI
    document.querySelectorAll('input').forEach(input => input.value = '');
    const addressButton = document.querySelector('#address-button');
    addressButton.setAttribute('data-content', currentAddress);
    addressButton.querySelector('span').textContent = shortenHex(currentAddress);
    show('account-view', 'login-view');
    closeDialog();
}

async function logout() {
    currentAddress = null;
    document.querySelectorAll('input').forEach(input => input.value = '');
    show('login-view', 'account-view');
}

async function getLottery(lotteryHash) {
    if (!lotteryHash.startsWith('0x')) {
        lotteryHash = '0x' + lotteryHash;
    }
    if (lotteryHash.length !== 66) {
        throw new Error('Invalid lottery hash. It must be 64 characters long (32 bytes in hexadecimal)');
    }
    let lottery;
    try {
        lottery = await contract.methods.getLottery(lotteryHash).call({ from: currentAddress });
    } catch (error) {
        throw new Error(error.message);
    }
    if (lottery.manager === web3.utils.padLeft(0, 40)) {
        throw new Error('There is no lottery with the given hash 😢');
    }
    return lottery;
}

async function getUserLotteries(address) {
    let lotteries;
    try {
        lotteries = await contract.methods.getUserLotteries(address).call({ from: currentAddress })
    } catch (error) {
        throw new Error("Error while fetching user's lotteries");
    }
    lotteries.created = lotteries.created.filter((lottery, index, self) =>
        index === self.findIndex((l) => (
            l.lotteryHash === lottery.lotteryHash
        ))
    );
    lotteries.entered = lotteries.entered.filter((lottery, index, self) =>
        index === self.findIndex((l) => (
            l.lotteryHash === lottery.lotteryHash
        ))
    );
    return lotteries;
}

async function refreshUserLotteries() {
    let lotteries;
    try {
        lotteries = await getUserLotteries(currentAddress);
    } catch (error) {
        showDialog({
            title: 'Error',
            message: error.message,
            closable: true,
        });
        return;
    }
    const createdLotteries = document.querySelector('#created-lottery-list');
    const enteredLotteries = document.querySelector('#entered-lottery-list');
    createdLotteries.innerHTML = '';
    enteredLotteries.innerHTML = '';

    if (lotteries.created.length === 0) {
        createdLotteries.innerHTML = '<p class="empty-list">You have not created any lotteries yet</p>';
    }
    if (lotteries.entered.length === 0) {
        enteredLotteries.innerHTML = '<p class="empty-list">You have not entered any lotteries yet</p>';
    }

    lotteries.created.forEach(lottery => {
        const lotteryItem = document.createElement('div');
        lotteryItem.classList.add('lottery-item');
        lotteryItem.onclick = () => doSearchLottery(lottery.lotteryHash);
        lotteryItem.innerHTML = `
        <p class="lottery-item-hash">${shortenHex(lottery.lotteryHash)}</p>
        <div class="lottery-item-info">
            <p class="lottery-item-remaning">Remaining time: <span>${durationReadable(Number(lottery.endTimestamp) - Math.floor(Date.now() / 1000))}</span></p>
            <p class="lottery-item-status">Status: <span class="${getState(lottery).toLowerCase()}">${getState(lottery)}</span></p>
        </div>`;
        createdLotteries.insertBefore(lotteryItem, createdLotteries.firstChild);
    });
    lotteries.entered.forEach(lottery => {
        const lotteryItem = document.createElement('div');
        lotteryItem.classList.add('lottery-item');
        lotteryItem.onclick = () => doSearchLottery(lottery.lotteryHash);
        lotteryItem.innerHTML = `
        <p class="lottery-item-hash">${shortenHex(lottery.lotteryHash)}</p>
        <div class="lottery-item-info">
            <p class="lottery-item-remaning">Remaining time: <span>${durationReadable(Number(lottery.endTimestamp) - Math.floor(Date.now() / 1000))}</span></p>
            <p class="lottery-item-status">Status: <span class="${getState(lottery).toLowerCase()}">${getState(lottery)}</span></p>
        </div>`;
        enteredLotteries.insertBefore(lotteryItem, enteredLotteries.firstChild);
    });


}

async function doSearchLottery(lotteryHash) {
    showDialog({
        spinner: true,
    });
    let lottery;
    try {
        lottery = await getLottery(lotteryHash);
    } catch (error) {
        showDialog({
            title: 'Error',
            message: error.message,
            closable: true,
        });
        return;
    }
    const yourLottery = lottery.manager.toUpperCase() === currentAddress.toUpperCase();
    const isOpen = getState(lottery) === 'OPEN';
    const isClosed = getState(lottery) === 'CLOSED';
    let messageHTML =
        `${hashButton(lottery.lotteryHash)}
    <strong>Manager:</strong> ${href(lottery.manager)} ${yourLottery ? '<span class="you">(You)</span>' : ''}</br>
    <strong>Ticket price:</strong> ${web3.utils.fromWei(lottery.ticketPrice, 'ether')} ETH</br>
    <strong>Ticket count:</strong> ${lottery.ticketCount}</br>
    <strong>Prize pool:</strong> ${web3.utils.fromWei(lottery.prizePool, 'ether')} ETH</br>
    <strong>Start time:</strong> ${new Date(Number(lottery.startTimestamp) * 1000).toLocaleString()}</br>
    <strong>End time:</strong> ${new Date(Number(lottery.endTimestamp) * 1000).toLocaleString()}</br>
    <strong>Remaining time:</strong> ${durationReadable(Number(lottery.endTimestamp) - Math.floor(Date.now() / 1000))}</br>
    <strong>State:</strong> ${getState(lottery)}</br>`;
    if (getState(lottery) === 'ENDED') {
        messageHTML += `<strong>Winner:</strong> ${href(lottery.winner)} ${lottery.winner.toUpperCase() === currentAddress.toUpperCase() ? '<span class="you">(You)</span>' : ''}</br>`;
    }
    let buttons = [];
    let inputs = [];
    if (isOpen) {
        buttons.push({
            text: 'Buy tickets',
            action: () => {
                const tickets = document.querySelector('#tickets').value;
                buyTickets(lottery, tickets);
            },
            focus: true,
        });

        inputs.push({
            name: 'tickets',
            label: 'Number of tickets',
            icon: 'ticket-solid.svg',
            type: 'number',
            placeholder: 'Number of tickets',
        });

        if (yourLottery) {
            buttons.push({
                text: 'Cancel lottery',
                action: () => cancelLottery(lottery),
            });
        }
    }
    if (isClosed && yourLottery) {
        buttons.push({
            text: 'Select winner',
            action: () => selectWinner(lottery),
            focus: true,
        });
    }
    buttons.push({
        text: 'Close',
        action: closeDialog,
    });

    showDialog({
        title: 'Lottery details',
        message: messageHTML,
        closable: true,
        inputs: inputs,
        buttons: buttons,
    });
}

async function cancelLottery(lottery) {
    showDialog({
        title: 'Are you sure?',
        message: `Do you confirm the cancellation of the lottery with hash ${shortenHex(lottery.lotteryHash)}?</br>
        <strong>Warning:</strong> This action is irreversible and will refund all the tickets bought.`,
        buttons: [
            {
                text: 'Confirm',
                action: () => {
                    doCancelLottery(lottery);
                },
                focus: true,
            },
            {
                text: 'Cancel',
                action: closeDialog,
            },
        ],
        closable: true,
    });
}

async function doCancelLottery(lottery) {
    showDialog({
        title: 'Cancelling lottery...',
        message: 'Please wait while the lottery is being cancelled...',
        spinner: true,
    });
    const hash = lottery.lotteryHash;
    const transaction = await cancelLotteryTransaction(hash);
    ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
    })
        .then(getTransactionReceipt)
        .then(() => {
            showDialog({
                title: 'Lottery cancelled',
                message: `The lottery has been cancelled successfully. All tickets have been refunded.`,
                closable: true,
                buttons: [
                    {
                        text: 'Close',
                        action: closeDialog,
                    },
                ],
            });
        })
        .then(refreshUserLotteries)
        .catch((error) => {
            showDialog({
                title: 'Error',
                message: error.message,
                closable: true,
            });
        });
}

async function selectWinner(lottery) {
    showDialog({
        title: 'Selecting winner...',
        message: 'Please wait while the winner is being selected...',
        spinner: true,
    });
    const hash = lottery.lotteryHash;
    const transaction = await selectWinnerTransaction(hash);
    ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
    })
        .then(getTransactionReceipt)
        .then(getWinnerInfoFromReceipt)
        .then((info) => {
            if (info !== null) {
                showDialog({
                    title: 'Winner selected!',
                    message:
                        `The winner has been selected successfully.</br>
                    <strong>Winner:</strong> ${href(info.winner)} ${info.winner.toUpperCase() === currentAddress.toUpperCase() ? '<span class="you">(You)</span>' : ''}</br>
                    <strong>Prize:</strong> ${web3.utils.fromWei(info.prize, 'ether')} ETH</br>
                    <p class="nb">The prize consists of 90% of the prize pool and the remaining 10% is kept by the manager.</p>`,
                    closable: true,
                    buttons: [
                        {
                            text: 'Close',
                            action: closeDialog,
                        },
                    ],
                });
            } else {
                showDialog({
                    title: 'Lottery cancelled',
                    message: `The lottery has been cancelled since no one bought tickets 😢`,
                    closable: true,
                    buttons: [
                        {
                            text: 'Close',
                            action: closeDialog,
                        },
                    ],
                });
            }
        })
        .then(refreshUserLotteries)
        .catch((error) => {
            console.log(error);
            showDialog({
                title: 'Error',
                message: error.message,
                closable: true,
            });
        });
}

async function buyTickets(lottery, tickets) {
    let value;
    try {
        value = web3.utils.toBigInt(lottery.ticketPrice) * web3.utils.toBigInt(tickets);
    } catch (error) {
        showDialog({
            title: 'Error',
            message: error.message,
            closable: true,
        });
        return;
    }
    showDialog({
        title: 'Are you sure?',
        message: `Do you confirm the purchase of ${tickets} tickets for this lottery?</br><strong>Total price:</strong> ${web3.utils.fromWei(value, 'ether')} ETH`,
        buttons: [
            {
                text: 'Confirm',
                action: () => {
                    doBuyTickets(lottery.lotteryHash, tickets, value);
                },
                focus: true,
            },
            {
                text: 'Cancel',
                action: closeDialog,
            },
        ],
        closable: true,
    });
}

async function doBuyTickets(lotteryHash, tickets, value) {
    showDialog({
        title: 'Buying tickets...',
        message: 'Please wait while the transaction is being processed...',
        spinner: true,
    });
    const transaction = await buyTicketsTransaction(lotteryHash, tickets, value);
    console.log(transaction);
    ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transaction],
        })
        .then(getTransactionReceipt)
        .then(() => {
            showDialog({
                title: 'Payment successful',
                message: `The transaction has been successfully processed. You have bought ${tickets} tickets for the lottery.</br><strong>Good luck!</strong>`,
                closable: true,
                buttons: [
                    {
                        text: 'Close',
                        action: closeDialog,
                    },
                ],
            });
        })
        .then(refreshUserLotteries)
        .catch((error) => {
            showDialog({
                title: 'Error',
                message: error.message,
                closable: true,
            });
        });
}

async function selectWinnerTransaction(hash) {
    const selectWinnerABI = contract.methods.selectWinner(hash).encodeABI();
    const transaction = {
        from: currentAddress,
        to: contractAddress,
        value: 0,
        data: selectWinnerABI,
    };
    return transaction;
}

async function buyTicketsTransaction(lotteryHash, tickets, value) {
    const buyTicketsABI = contract.methods.buyTickets(lotteryHash, tickets).encodeABI();
    const transaction = {
        from: currentAddress,
        to: contractAddress,
        value: web3.utils.toHex(value),
        data: buyTicketsABI,
    };
    return transaction;
}

async function createLotteryTransaction(ticketPrice, duration) {
    const createLotteryABI = contract.methods.createLottery(ticketPrice, duration).encodeABI();
    const transaction = {
        from: currentAddress,
        to: contractAddress,
        value: 0,
        data: createLotteryABI,
    };
    return transaction;
}

async function cancelLotteryTransaction(hash) {
    const cancelLotteryABI = contract.methods.cancelLottery(hash).encodeABI();
    const transaction = {
        from: currentAddress,
        to: contractAddress,
        value: 0,
        data: cancelLotteryABI,
    };
    return transaction;
}

async function createLottery(ticketPrice, duration) {
    showDialog({
        title: 'Creating lottery...',
        message: 'Please wait while the lottery is being created...',
        spinner: true,
    });
    const transaction = await createLotteryTransaction(ticketPrice, duration);
    ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transaction],
        })
        .then(getTransactionReceipt)
        .then(getLotteryHashFromReceipt)
        .then((lotteryHash) => {
            showDialog({
                title: 'Lottery created',
                message: `The lottery has been createdy successfully. The lottery hash is</br>${hashButton(lotteryHash)}Copy it and share it with your friends.`,
                closable: true,
            });
        })
        .then(refreshUserLotteries)
        .catch((error) => {
            showDialog({
                title: 'Error',
                message: error.message,
                closable: true,
            });
        });
}

async function getTransactionReceipt(txHash) {
    let receipt;
    try {
        receipt = await web3.eth.getTransactionReceipt(txHash);
    } catch (error) { }
    if (receipt === null || receipt === undefined) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getTransactionReceipt(txHash));
                console.log("Waiting for transaction confirmation");
            }, 1000);
        });
    } else {
        return receipt;
    }
}

async function getLotteryHashFromReceipt(receipt) {
    const logs = receipt.logs;
    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        const decodedLogs = web3.eth.abi.decodeLog(contractJsonInterface[1].inputs, log.data, log.topics);
        if (
            decodedLogs.manager.toUpperCase() === currentAddress.toUpperCase() &&
            decodedLogs.lotteryHash !== undefined) {
            return decodedLogs.lotteryHash;
        }
        throw new Error("No lottery hash found in the transaction receipt");
    }
}

async function getWinnerInfoFromReceipt(receipt) {
    const logs = receipt.logs;
    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        try {
            const decodedLogs = web3.eth.abi.decodeLog(contractJsonInterface[2].inputs, log.data, log.topics);
            if (decodedLogs.lotteryHash !== undefined && decodedLogs.winner !== undefined) {
                console.log(decodedLogs.winner);
                console.log(decodedLogs.prize);
                return { winner: decodedLogs.winner, prize: decodedLogs.prize };
            }
        } catch (error) { // The error is thrown when the log is not a LotteryEnded event, but a LotteryCancelled event
            return null;
        }
        throw new Error("No winner found in the transaction receipt");
    }
}

function shortenHex(hex) {
    hex = hex.slice(2).toUpperCase();
    hex = hex.slice(0, 4) + "..." + hex.slice(-4);
    return "0x" + hex;
}

function href(address) {
    return `<a href="https://sepolia.etherscan.io/address/${address}" target="_blank">${shortenHex(address)}</a>`;
}

function hashButton(hash) {
    return `<button class="copy-button hash-button" data-content="${hash}" onclick="copyData(this)">
        <span>${shortenHex(hash)}</span>
        <img src="public/img/copy-solid.svg" alt="copy" height="20px">
    </button>`;
}

function show(shown, hidden) {
    document.getElementById(shown).style.display = 'flex';
    document.getElementById(shown).style.opacity = '1';

    document.getElementById(hidden).style.display = 'none';
    document.getElementById(hidden).style.opacity = '0';

    return false;
}


function showDialog(options) {
    const dialog = document.querySelector('#dialog');
    if (dialog.open) {
        closeDialog();
    }
    if (options.closable) {
        dialog.querySelector('#close-button').style.display = 'block';
    }

    if (options.spinner) {
        dialog.querySelector('#dialog-spinner').style.display = 'block';
    }

    if (options.title !== undefined) {
        dialog.querySelector('#dialog-title').style.display = 'block';
        dialog.querySelector('#dialog-title').innerHTML = options.title;
    }

    if (options.message !== undefined) {
        dialog.querySelector('#dialog-message').style.display = 'block';
        dialog.querySelector('#dialog-message').innerHTML = options.message;
    }

    //Add inputs
    const dialogInputs = dialog.querySelector('#dialog-inputs');
    if (options.inputs !== undefined) {
        dialogInputs.style.display = 'flex';
        options.inputs.forEach(input => {
            const inputContainer = document.createElement('div');
            inputContainer.classList.add('input-container');
            inputContainer.innerHTML = `
            <label for="${input.name}">${input.label}</label>
            <div class="input-group">
                <img class="input-icon" src="public/img/${input.icon}" alt="${input.icon}" height="20px">
                <input type="${input.type}" id="${input.name}" name="${input.name}" placeholder="${input.placeholder || ''}">
            </div>`;
            dialogInputs.appendChild(inputContainer);
        });
    }

    //Add buttons
    const dialogButtons = dialog.querySelector('#dialog-buttons');
    if (options.buttons !== undefined) {
        dialogButtons.style.display = 'flex';
        options.buttons.forEach(button => {
            const buttonElement = document.createElement('button');
            buttonElement.innerText = button.text;
            buttonElement.onclick = button.action;
            if (button.focus) {
                buttonElement.classList.add('focus');
            }
            dialogButtons.appendChild(buttonElement);
        });
    }

    dialog.showModal();
}

function closeDialog() {
    const dialog = document.querySelector('#dialog');

    dialog.querySelector('#dialog-title').style.display = 'none';
    dialog.querySelector('#dialog-message').style.display = 'none';

    const dialogInputs = dialog.querySelector('#dialog-inputs');
    dialogInputs.innerHTML = '';
    dialogInputs.style.display = 'none';

    const dialogButtons = dialog.querySelector('#dialog-buttons');
    dialogButtons.innerHTML = '';
    dialogButtons.style.display = 'none';

    dialog.querySelector('#dialog-spinner').style.display = 'none';
    dialog.querySelector('#close-button').style.display = 'none';

    dialog.close();
}

function copyData(element) {
    const button = element.tagName === 'BUTTON' ? element : element.parentElement;
    const data = button.getAttribute('data-content');
    navigator.clipboard.writeText(data);
    if (button.id === 'address-button') {
        const tooltip = document.querySelector('#address-tooltip');
        tooltip.textContent = 'Copied!';
    }
}

function getTicketPrice() {
    const ticketPrice = document.querySelector('#ticket-price').value;
    if (ticketPrice === '') {
        throw new Error('Ticket price cannot be empty');
    }
    if (isNaN(ticketPrice)) {
        throw new Error('Ticket price must be a number');
    }
    if (ticketPrice <= 0) {
        throw new Error('Ticket price must be greater than 0');
    }
    return { eth: ticketPrice, wei: web3.utils.toWei(ticketPrice, 'ether') };
}

function getEndtime() {
    const endTime = document.querySelector('#end-time').value;
    if (endTime === '') {
        throw new Error('End time cannot be empty');
    }
    if (isNaN(Date.parse(endTime))) {
        throw new Error('End time is not a valid date');
    }
    if (Date.parse(endTime) <= Date.now()) {
        throw new Error('End time must be in the future');
    }
    return { date: new Date(endTime), unix: Date.parse(endTime) / 1000 };
}

function getNow() {
    let now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    return { date: now, unix: now.getTime() / 1000 };
}

function durationReadable(duration) {
    if (duration < 0) {
        return '0d 0h 0m 0s';
    }
    let seconds = duration % 60;
    let minutes = Math.floor(duration / 60) % 60;
    let hours = Math.floor(duration / 3600) % 24;
    let days = Math.floor(duration / 86400);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function getState(lottery) {
    let active = lottery.endTimestamp > Math.floor(Date.now() / 1000);
    if (lottery.state === 0n && active) {
        return 'OPEN';
    }
    if (lottery.state === 0n && !active) {
        return 'CLOSED';
    }
    if (lottery.state === 1n) {
        return 'ENDED';
    }
    return 'CANCELLED';
}

let interval;
async function refreshLotteries() {
    let updated = false;
    refreshUserLotteries().then(() => updated = true);
    document.querySelector('#refresh-button').style.animation = 'spin 1s linear';
    interval = setInterval(() => {
        if (!updated) {
            document.querySelector('#refresh-button').style.animation = 'spin 1s linear';
        } else {
            document.querySelector('#refresh-button').style.animation = 'none';
            clearInterval(interval);
        }
    }, 1000);
}

async function searchLottery() {
    const lotteryHash = document.querySelector('#lottery-hash').value;
    doSearchLottery(lotteryHash);
}

document.querySelectorAll('.copy-button').forEach(button => button.onclick = (event) => copyData(event.target));
document.querySelectorAll('#address-button').forEach(button => button.addEventListener('mouseenter', () => {
    const tooltip = document.querySelector('#address-tooltip');
    tooltip.textContent = 'Copy to clipboard';
}));

document.querySelector('#created-lotteries-button').addEventListener('click', async () => {
    await refreshUserLotteries();
    show('created-lottery-list', 'entered-lottery-list');
    document.querySelector('#created-lotteries-button').classList.add('active');
    document.querySelector('#entered-lotteries-button').classList.remove('active');
});

document.querySelector('#entered-lotteries-button').addEventListener('click', async () => {
    await refreshUserLotteries();
    show('entered-lottery-list', 'created-lottery-list');
    document.querySelector('#entered-lotteries-button').classList.add('active');
    document.querySelector('#created-lotteries-button').classList.remove('active');
});

document.querySelector('#search-lottery-button').addEventListener('click', searchLottery);

document.querySelector('#create-lottery-button').addEventListener('click', () => {
    let ticketPrice;
    let duration;
    let endTime;
    try {
        ticketPrice = getTicketPrice();
        endTime = getEndtime().unix;
        duration = endTime - getNow().unix;
    } catch (error) {
        showDialog({
            title: 'Error',
            message: error.message,
            closable: true,
        });
        return;
    }
    showDialog({
        title: 'Are you sure?',
        message: `Do you confirm the creation of this lottery?</br><strong>Ticket price:</strong> ${ticketPrice.eth} ETH</br><strong>End time:</strong> ${getEndtime().date.toLocaleString()}`,
        buttons: [
            {
                text: 'Confirm',
                action: () => {
                    createLottery(ticketPrice.wei, duration);
                },
                focus: true,
            },
            {
                text: 'Cancel',
                action: closeDialog,
            },
        ],
        closable: true,
    });
});