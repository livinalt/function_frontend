import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [newOwner, setNewOwner] = useState("");
  const [networkName, setNetworkName] = useState("Ethereum");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    try {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
      }

      if (ethWallet) {
        const accounts = await ethWallet.request({ method: "eth_accounts" });
        handleAccount(accounts);
      }
    } catch (error) {
      console.error("Error getting wallet:", error);
    }
  };

  const handleAccount = (account) => {
    try {
      if (account && account.length > 0) {
        console.log("Account connected:", account);
        setAccount(account[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.error("Error handling account:", error);
    }
  };

  const connectAccount = async () => {
    try {
      if (!ethWallet) {
        alert("MetaMask wallet is required to connect");
        return;
      }

      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);

      // once wallet is set we can get a reference to our deployed contract
      getATMContract();
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  const getATMContract = () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

      setATM(atmContract);
    } catch (error) {
      console.error("Error getting ATM contract:", error);
    }
  };

  const getBalance = async () => {
    try {
      if (atm) {
        const balance = await atm.getBalance();
        console.log("Balance retrieved:", balance.toNumber());
        setBalance(balance.toNumber());
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const deposit = async () => {
    try {
      if (atm) {
        let tx = await atm.deposit(1);
        console.log("Deposit transaction sent:", tx);
        await tx.wait();
        console.log("Deposit transaction confirmed");
        getBalance();
      }
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  const withdraw = async () => {
    try {
      if (atm) {
        let tx = await atm.withdraw(1);
        console.log("Withdrawal transaction sent:", tx);
        await tx.wait();
        console.log("Withdrawal transaction confirmed");
        getBalance();
      }
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  const transferOwnership = async () => {
    try {
      if (atm && newOwner) {
        let tx = await atm.transferOwnership(newOwner);
        console.log("Transfer ownership transaction sent:", tx);
        await tx.wait();
        console.log("Transfer ownership transaction confirmed");
      }
    } catch (error) {
      console.error("Error transferring ownership:", error);
    }
  };

  const _setNetwork = async () => {
    try {
      if (ethereum) {
        console.log("Network:", ethereum.networkVersion);
      } else {
        console.log("Unknown network");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const initUser = () => {
    try {
      // Check to see if the user has MetaMask
      if (!ethWallet) {
        return <p>Please install MetaMask to use this.</p>;
      }

      // Check to see if the user is connected. If not, connect to their account
      if (!account) {
        return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
      }

      // Fetch the balance if not available
      if (balance === undefined) {
        getBalance();
      }

      return (
        <div>
          <p>Network: {networkName} </p>
          <p>Your Account: {account}</p>
          <p>Your Balance: {balance}</p>
          <button onClick={deposit}>Deposit 1 ETH</button>
          <button onClick={withdraw}>Withdraw 1 ETH</button>
        </div>
      );
    } catch (error) {
      console.error("Error initializing user:", error);
      return <p>An error occurred while initializing the user.</p>;
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Majorie Bloc!</h1>
      </header>
      {initUser()}
      <style jsx>{`
       .container {
        text-align: center;
      }
  
      header {
        background-color: #0067ff;
        color: #dedede;
        padding: 10px;
        margin-bottom: 20px;
      }
  
      h1 {
        margin: 0;
      }
      `}</style>
    </main>
  );
}
