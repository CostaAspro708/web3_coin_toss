//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CoinToss {
    uint256 gameCount;

    event Bet(address from, uint256 amount, uint256 timestamp);
    struct BetStruct{
        address creator;
        uint amount;
        uint256 timestamp;
    }

    BetStruct[] bets;
    



    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
