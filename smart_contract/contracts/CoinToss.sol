//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

/** 
 * @title Bet
 * @dev Implements betting process
 */

contract Bet{
    uint256 betCount; 

    struct BetStruct{
        address creator_address;
        uint256 ammount;
        //bool active;
        uint256 timestamp;
        uint index;
    }

    mapping(address => BetStruct) betMap;
    mapping(address => bool) active;
    BetStruct[] bets;
    
    constructor(){
        betCount = 0;
    }


    function createBet(uint256 ammount) public {
        
        //User must not have an active bet.
        require(active[msg.sender] == false);
        betCount++;
        bets.push(BetStruct(msg.sender, ammount, block.timestamp, betCount));
        betMap[msg.sender] = BetStruct(msg.sender, ammount,  block.timestamp, betCount);
        active[msg.sender] = true;
    }

    function deleteBet() public {
        betMap[msg.sender] = BetStruct(msg.sender, 0,  0, 0);
        active[msg.sender] = false;
    }

    function getMyBet() public view returns(BetStruct memory){
        return betMap[msg.sender];
    }

    // //The index for the bet to join. Should be the betCount of bet.
    // function joinBet(uint256 index) public {
    //     active[][index] = false;
    // }

    function getAllBets() public view returns(BetStruct[] memory) {
        return bets;
    }


    function getCount() public view returns(uint256) {
        return betCount;
    }


}

