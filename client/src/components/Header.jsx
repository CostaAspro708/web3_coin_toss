import React, { useContext, useEffect } from "react";
//Importing Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { TransactionContext } from "../context/TransactionContext";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-gray-100 border-none text-sm white-glassmorphism"
    />
  );
  


const Header = () =>{
    const { handleChange,formDepositData, connectWallet,currentAccount, currentBalance,deposit, balance, withdraw, currentMyBet, myBet} = useContext(TransactionContext);
    //myBet();
    const handleDepisit = async (e) => {
        const depositAmount = formDepositData;
        e.preventDefault();
        
        if(!depositAmount || depositAmount <= 0) return;
    
        await deposit(depositAmount);
        balance();
      };
    
    const handleWithdraw = async (e) => {
        const depositAmount = formDepositData;
        e.preventDefault();
        if(!depositAmount || depositAmount <= 0) return;
        await withdraw(depositAmount);
        balance();
    };
    useEffect(() => {
        balance();
    }, []);
    return(

        <div>
            <div className="text-white w-full mt-3">
                {currentAccount
                    ?  
                    //if no account found diplay connect wallet button 
                    <div className="flex justify-end mx-12 ">
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="bg-[#2952e3] hover:bg-[#2546bd] text-white font-bold py-2 px-4 rounded"
                        >
                            <p className="text-white text-base font-semibold">Connect Wallet</p>
                        </button>
                    </div>
                    :
                    //else display deposit and withdraw buttons
                    <div className="flex justify-end mx-12 "> 
                        <div className=" py-2 rounded-tl rounded-bl bg-[#FBD000] font-bold">Balance: {currentBalance}  ETH</div>
                        <button class="bg-[#FF0000] hover:bg-[#C80000] text-white font-bold py-2 px-4 rounded-tr rounded-br" data-bs-toggle="modal" data-bs-target="#withdrawModal">
                            Withdraw
                        </button>
                        <button class="bg-[#00AF00] hover:bg-[#008200] text-white font-bold mx-4 py-2 px-4 rounded" data-bs-toggle="modal" data-bs-target="#depositModal">
                            Deposit
                        </button>
                    </div>
                }
                
            </div>

        
        <div>
        {/* Depoist pop up form */}
         <div class="modal fade" id="depositModal" aria-labelledby="depositModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5  id="depositModalLabel">Deposit</h5>
                        <button type="button" className='text-red' data-bs-dismiss="modal" aria-label="Close">x</button>
                    </div>
                        <div class="modal-body">
               
                            <div class="mb-3">
                                <label class="form-label">Current balance: {currentBalance}</label>
                                <br></br>
                                <label class="form-label">Amount in Eth</label>
                                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                                <div id="emailHelp" class="form-text">Enter an amount to add to your betting wallet.</div>
                            </div>
                        <button className="bg-[#00AF00] hover:bg-[#008200] text-white  py-2 px-4 rounded" onClick={handleDepisit}>Deposit</button>
                        </div>
                            <div class="modal-footer">
                                <button type="button" className="bg-[#FBD000] hover:bg-[#FBBB00] text-white  py-2 px-4 rounded" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        {/* Withdraw pop up form */}
         <div class="modal fade" id="withdrawModal" aria-labelledby="withdrawModalLabel" aria-hidden="true">
        <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5  id="withdrawModalLabel">Withdraw</h5>
                        <button type="button" className='text-red' data-bs-dismiss="modal" aria-label="Close">x</button>
                    </div>
                        <div class="modal-body">
                
                            <div class="mb-3">
                                <label class="form-label">Current balance: {currentBalance}</label>
                                <br></br>
                                <label class="form-label">Amount in Eth</label>
                                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                                <div id="emailHelp" class="form-text">Enter an amount to add to your betting wallet.</div>
                            </div>
                        <button className="bg-[#00AF00] hover:bg-[#008200] text-white  py-2 px-4 rounded" onClick={handleWithdraw}>withdraw</button>
                        </div>
                            <div class="modal-footer">
                                <button type="button" className="bg-[#FBD000] hover:bg-[#FBBB00] text-white  py-2 px-4 rounded" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
       
    );
}

export default Header;