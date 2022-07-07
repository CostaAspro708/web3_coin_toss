//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
/** 
 * @title Bet
 * @dev Implements betting process
 */

contract Bet{
    uint256 betCount; 
    uint256 minBet = 200;
    struct BetStruct{
        address creator_address;
        uint256 ammount;
        uint256 timestamp;
        bool active;
        address winner;
    }

    mapping(address => BetStruct) betMap;
    mapping(address => bool) userExists;
    mapping(address => uint256) balances;

    address[] accounts;
    BetStruct[] bets;
    BetStruct[] pastBets;
    
    constructor(){
        betCount = 0;
    }


    //gas 93500
    function depostitEth() public payable{
        require(msg.value > 0, "No eth to deposit");

        //Used to later check for active games.
        if(userExists[msg.sender] == false){
            accounts.push(msg.sender);
            userExists[msg.sender] = true;
        }
        balances[msg.sender] += msg.value;
    }

    //gas 31524
    function withdrawEth(uint256 withdrawAmount) public payable{
        require(userExists[msg.sender] == true, "user does not exist");
        require(balances[msg.sender] >= withdrawAmount, "Insufficient Balance");
        balances[msg.sender] -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);

    }


    function getBalance() public view returns(uint256){
        return balances[msg.sender];
    }
    
    //gas 117022
    function createBet(uint256 ammount) public { 
        //User must not have an active bet.
        require(ammount > 0 ,"minimum bet is 200 wei");
        require(balances[msg.sender] >= ammount, "Not enough eth deposited");
        require(betMap[msg.sender].active == false,"already have active bet");
        balances[msg.sender] -= ammount;
        betMap[msg.sender] = BetStruct(msg.sender, ammount,  block.timestamp, true, 0x0000000000000000000000000000000000000000);
        //bets.push(BetStruct(msg.sender, ammount, block.timestamp, true, msg.sender));
        betCount++;
    }
    
    //gas 73985
    function deleteBet() public {
        require(betMap[msg.sender].active = true, "user does not have an active bet");
        balances[msg.sender] += betMap[msg.sender].ammount;
        betMap[msg.sender] = BetStruct(msg.sender, 0,  0, false, 0x0000000000000000000000000000000000000000);
        betMap[msg.sender].active = false;
    }
    
    //A helper function used for getting a random winner.
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, betCount)));   
    }
    function selectWinner() private view returns (uint) {
        uint winner = random()%99;
        return winner;
        
    }

    //gas 159525
    //The index for the bet to join. Should be the betCount of bet.
    function joinBet(address creator_address) public {
        address winner; 
        //Can only join active bet and cant join own bet.
        require(balances[msg.sender] >= betMap[creator_address].ammount, "not enough eth to cover bet");
        require(betMap[creator_address].active == true,"not an active bet");
        require(msg.sender != creator_address, "cant join own bet");

        balances[msg.sender] -= betMap[creator_address].ammount;

        if(selectWinner() < 49){
            console.log('winner: ', msg.sender);
            winner = msg.sender;
        }else{
            console.log('winner: ', creator_address);
            winner = creator_address;      
        }

        balances[winner] += (betMap[creator_address].ammount * 2);
        betMap[creator_address].winner = winner;
        betMap[creator_address].active = false;

        pastBets.push(betMap[creator_address]);
        
        betMap[creator_address].active = false;

    }


    function getMyBet() public view returns(BetStruct memory){
        return betMap[msg.sender];
    }

    function ActiveBets() public view returns(BetStruct[] memory) {
        uint256 resultCount;
        for(uint i; i<accounts.length; i++){
            if(betMap[accounts[i]].active == true){
                resultCount++;
            }
        }
        uint j = 0;
        BetStruct[] memory activeBets = new BetStruct[](resultCount);
        for(uint i; i<accounts.length; i++){
            if(betMap[accounts[i]].active == true){
                activeBets[j] = betMap[accounts[i]];
            }
        }
        return activeBets; 
    }

    function getPastBets() public view returns(BetStruct[] memory){
        return pastBets;
    }

    function getCount() public view returns(uint256) {
        return betCount;
    }


}

