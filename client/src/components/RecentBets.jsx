import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";




const PastBetCard = (myBetObject) => {
    //console.log(myBetObject.myBetObject.);
    const tester = myBetObject.myBetObject.ammount;
    
    return(
        
            <div className="blue-glassmorphism">
            </div>
        
    );
}
const ActiveBetCard = (myBetObject) => {
    //console.log(myBetObject.myBetObject.);
    const tester = myBetObject.myBetObject.ammount;

    return(
        
            <div className="p-40 blue-glassmorphism w-3/4">
            </div>
        
    );
}
const RecentBets = () => {
    const {pastBets, currentMyBet, myBet, deleteBet, ActiveBets} = useContext(TransactionContext);
    
    const MyBetCard = (myBetObject) => {
        const tester = myBetObject.myBetObject.ammount;
       
        return(

            <div>
                 {myBetObject.myBetObject.active &&
                <div className="flex justify-center items-center text-white blue-glassmorphism">
                    <div className="mx-2">
                        {myBetObject.myBetObject.ammount}
                    </div>
                    {myBetObject.myBetObject.timestamp}
                   
                        <button class="bg-[#FF0000] hover:bg-[#C80000] text-white font-bold py-2 px-4 rounded-tr rounded-br" onClick={deleteBet}>
                            Delete
                        </button>
                    
                </div>
                }
            </div>
                
            
        );
    }
    useEffect(() => {
        myBet()
        pastBets();
        ActiveBets();
    }, []);
    
    return (
        <div>
             {currentMyBet.active &&
                <div className="flex justify-center text-white font-extrabold">
                    My active bet
                </div>
}
                <div className="flex justify-center">
                    <MyBetCard myBetObject={currentMyBet}/>
                </div>
        
        </div>
    );
}
export default RecentBets;