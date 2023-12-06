// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

contract MetaMaskIntegration {
    address public owner;

    event EtherTransferred(address indexed from, address indexed to, uint256 amount);
    event TokenTransferred(address indexed from, address indexed to, address indexed token, uint256 amount);
    event TokenApproval(address indexed owner, address indexed spender, address indexed token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getWalletAddress() external view returns (address) {
        return owner;
    }

    function getEthBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function transferEther(address payable _recipient, uint256 _amount) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0 && _amount <= address(this).balance, "Invalid amount");

        _recipient.transfer(_amount);

        emit EtherTransferred(owner, _recipient, _amount);
    }

    function approveTokenTransfer(address _token, address _spender, uint256 _amount) external onlyOwner {
        require(_token != address(0), "Invalid token address");
        require(_spender != address(0), "Invalid spender address");
        require(_amount > 0, "Invalid approval amount");

        // Assuming ERC-20 standard transfer approval
        // token.approve(_spender, _amount);

        emit TokenApproval(owner, _spender, _token, _amount);
    }

    function transferToken(address _token, address _recipient, uint256 _amount) external onlyOwner {
        require(_token != address(0), "Invalid token address");
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0, "Invalid transfer amount");

        // Assuming ERC-20 standard token transfer
        // token.transfer(_recipient, _amount);

        emit TokenTransferred(owner, _recipient, _token, _amount);
    }
}
