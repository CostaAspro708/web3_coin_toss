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
        bool active;
        uint256 timestamp;
        uint index;
    }

    mapping(address => BetStruct) BetMap;
    BetStruct[] bets;
    
    constructor(){
        betCount = 0;
    }


    function createBet(uint256 ammount) public {
        betCount++;
        bets.push(BetStruct(msg.sender, ammount, true, block.timestamp, betCount));
    }

    function joinBet(uint256 count) public {
        
    }

    function getAllBets() public view returns(BetStruct[] memory) {
        return bets;
    }


    function getCount() public view returns(uint256) {
        return betCount;
    }


}

