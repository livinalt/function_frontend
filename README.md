# Frontend Integration Function

# Assessment Smart Contract

## Overview

The Assessment smart contract is a basic Ethereum smart contract written in Solidity. It provides functionality to manage an account balance, allowing the owner to deposit and withdraw funds. The contract emits events to provide transparency and allows external entities to monitor key actions.


## Getting Started

### Tech stacks

You would need the following pre-installed:

- Ethereum Development Environment (e.g., [Hardhat](https://hardhat.org/))
- Node.js

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/assessment-smart-contract.git
cd assessment-smart-contract
npm install
```

## Contract Details

### State Variables

- `owner`: Ethereum address representing the owner of the contract.
- `balance`: Unsigned integer representing the current balance of the contract in wei.

### Events

- `Deposit(uint256 amount)`: Emitted when a deposit is made.
- `Withdraw(uint256 amount)`: Emitted when a withdrawal is executed.

### Functions

- `getBalance()`: View function to check the current balance.
- `deposit(uint256 _amount)`: Payable function for the owner to deposit funds.
- `withdraw(uint256 _withdrawAmount)`: Function for the owner to withdraw funds.
- `transferOwnership(address payable newOwner)`: Function to transfer ownership to a new address.

### Custom Error

- `InsufficientBalance(uint256 balance, uint256 withdrawAmount)`: Triggered if a withdrawal exceeds the current balance.

## Usage Recommendations

This contract is suitable for managing account balances, allowing the owner to deposit and withdraw funds. Events provide transparency, and safety is enhanced through the use of `assert` and `require` statements.

## Safety Considerations

Thoroughly test the contract on test networks before deploying to the Ethereum mainnet. Ensure that the code meets security standards and is free of vulnerabilities.

## Testing

Make use of testing frameworks such as [Hardhat](https://hardhat.org/) to test the contract's functionality and identify potential issues.

## Contributing

Feel free to contribute by submitting pull requests.

## Author
Jeremiah Samuel

## License

This project is licensed under the MIT License
