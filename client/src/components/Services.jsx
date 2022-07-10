import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Services = () => {
    const { connectWallet, deposit, balance, withdraw,createBet, pastBets, myBet} = useContext(TransactionContext);

    useEffect(() => {
        //connectWallet();
        //deposit();
        balance();
        //pastBets();
        myBet();
        //createBet("0.02");
        //withdraw("0.1");


    }, [])
    return(
        <h1> Services </h1>
    );
}

export default Services;