import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}



export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccounts] = useState("");
    const [currentBalance, setCurrentBalance] = useState("");
    const [currentMyBet, setCurrentMyBet] = useState({
        // creatorAddress: "test",
        // ammount: "test",
        // timestamp: "test",
        // winner: "test",
        // active: "test"   
    });
    const [formDepositData, setFormDepositData] = useState();
    const [activeBetsList, setActiveBetsList] = useState();

    
    const handleChange = (e, name) => {
        setFormDepositData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    
    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({method: 'eth_accounts'});

        console.log(accounts);
    }
    
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccounts(accounts[0]);
        } catch (error) {
            console.log("error");
            throw new Error("No etherum object");
        }
    }
    const balance = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
            const transactionContract = getEthereumContract();
            const accountamount = await transactionContract.getBalance();
            const structuredAmount = parseInt(accountamount._hex)/(10**18);
            setCurrentBalance(structuredAmount);
            console.log(structuredAmount);
            
        } catch (error) {
            console.log(error)
        }
    }
    const deposit = async (amount) => {
        try {
            if(!ethereum) return alert("please install metamask");
            const betContract = getEthereumContract();
            console.log(amount.amount);
            const deposit = await betContract.depostitEth({ value: ethers.utils.parseEther(amount.amount) });
            await deposit.wait();
        } catch (error) {
            console.log("error")
            throw new Error("No ethereum object");
        }
    }

    const withdraw = async (ammount) => {
        try {
            if(!ethereum) return alert("please install metamask");
            const betContract = getEthereumContract();
            const withdrawAmount = parseInt(ammount)*(10**18);
            const withdraw = await betContract.withdrawEth(ethers.utils.parseEther(ammount.amount));
            await withdraw.wait();

            await balance();
        } catch (error) {
            console.log("error");
            throw new Error("No ethereum object withdraw");
        }
    }
    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.reciever,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex)/(10**18),
            }))
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
            
        } catch (error) {
            console.log(error)
        }
    }
    const pastBets = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
            const betContract = getEthereumContract();
            const pastBets = await betContract.getPastBets();
            const structuredPastBet = pastBets.map((bet) => ({
                creatorAddress: bet.creator_address,
                ammount: parseInt(bet.ammount._hex)/(10**18),
                timestamp: new Date(bet.timestamp.toNumber() * 1000).toLocaleString(),
                winner: bet.winner,
                active: bet.active
            }))
            console.log(structuredPastBet);
        } catch (error) {
            console.log("error");
            throw new Error("No ethereum object");
        }
    }

    const createBet = async (ammount) => {
        try {
            if(!ethereum) return alert("please install metamask");
            const betContract = getEthereumContract();
            const pastBets = await betContract.createBet(ethers.utils.parseEther(ammount));
            await pastBets.wait();
            console.log("done");
        } catch (error) {
            console.log("error");
            throw new Error("No ethereum object");
        }
    }
    const deleteBet = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
            const transactionContract = getEthereumContract();
            await transactionContract.deleteBet();
            console.log("succ");
        } catch (error) {
            console.log(error)
        }
    }
    const ActiveBets = async () => {
        if(!ethereum) return alert("please install metamask");
        const transactionContract = getEthereumContract();
        const activeBets = await transactionContract.ActiveBets();
        const structuredActiveBets = activeBets.map(()=> ({
            creatorAddress: myBet.creator_address,
            ammount: parseInt(myBet.ammount._hex)/(10**18),
            timestamp: new Date(myBet.timestamp.toNumber() * 1000).toLocaleString(),
            winner: myBet.winner,
            active: myBet.active
        }));
        setActiveBetsList(structuredActiveBets);

    }
    const myBet = async () => {
        try {
            if(!ethereum) return alert("please install metamask");
            const transactionContract = getEthereumContract();
            const myBet = await transactionContract.getMyBet();
            const structuredMyBet = {
                creatorAddress: myBet.creator_address,
                ammount: parseInt(myBet.ammount._hex)/(10**18),
                timestamp: new Date(myBet.timestamp.toNumber() * 1000).toLocaleString(),
                winner: myBet.winner,
                active: myBet.active
            };
            setCurrentMyBet(structuredMyBet);
            console.log(structuredMyBet);
        } catch (error) {
            console.log(error)
        }
    }
    


    useEffect(()=>{
        checkIfWalletIsConnected();
    }, []);
    return (
        <TransactionContext.Provider value={{handleChange, formDepositData, connectWallet,currentAccount, deposit, balance, withdraw, pastBets, createBet, currentMyBet, currentBalance, myBet, deleteBet, ActiveBets}}>
            {children}
        </TransactionContext.Provider>
    );
}
