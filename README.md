# Frontend Integration Function

## Overview

This repository contains a basic Ethereum smart contract written in Solidity. The smart contract provides functionalities to manage an account balance, enabling the owner to deposit and withdraw funds. It emits events to ensure transparency and allows external entities to monitor key actions.

### Tech Stacks

Ensure you have the following pre-installed:

- Ethereum Development Environment (e.g., [Hardhat](https://hardhat.org/))
- Node.js

### Installation

Clone the repository and install dependencies:

```gitbash
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
- `Withdraw(uint256 amount)`: Emitted when a withdrawal occurs.
- `OwnershipTransferred(address previousOwner, address newOwner)`: Emitted when ownership is transferred.

### Functions

- `getBalance()`: View function to check the current balance.
- `deposit(uint256 _amount)`: Payable function for the owner to deposit funds.
- `withdraw(uint256 _withdrawAmount)`: Function for the owner to withdraw funds.
- `transferOwnership(address payable newOwner)`: Function to transfer ownership to a new address.

### Custom Error

- `InsufficientBalance(uint256 balance, uint256 withdrawAmount)`: Triggered if a withdrawal exceeds the current balance.

## Usage Recommendations

This contract is suitable for managing account balances, enabling the owner to deposit and withdraw funds. Events provide transparency, and safety is enhanced through the use of `assert` and `require` statements.

### Wallet Integration Component

The frontend integration script is implemented in a React component named `HomePage.js`. It allows users to connect their MetaMask wallet, view account details, deposit and withdraw funds, and transfer funds to another address. Additionally, it includes styling for a user-friendly interface.

#### Usage

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm start
   ```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Testing

Utilize testing frameworks such as [Hardhat](https://hardhat.org/) to test the contract's functionality and identify potential issues.

## Contributing

Feel free to contribute by submitting pull requests.

## Author

Jeremiah Samuel

## License

This project is licensed under the MIT License.
