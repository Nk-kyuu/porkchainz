// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SupplyChain {
    
    struct Pig {
        uint id;
        string name;
        uint weight;
        bool isInspected;
    }
    
    struct Slaughterer {
        address account;
        bool isSlaughterer;
    }
    
    mapping(uint => Pig) public pigs;
    mapping(address => Slaughterer) public slaughterers;
    
    uint public pigCount;
    
    event PigAdded(uint indexed id, string name, uint weight);
    event PigInspected(uint indexed id);
    
    modifier onlySlaughterer() {
        require(slaughterers[msg.sender].isSlaughterer, "Only slaughterers can call this function");
        _;
    }
    
    constructor() {
        pigCount = 0;
    }
    
    function addPig(string memory _name, uint _weight) public {
        pigCount++;
        pigs[pigCount] = Pig(pigCount, _name, _weight, false);
        emit PigAdded(pigCount, _name, _weight);
    }
    
    function slaughtererInspectsPig(uint _id) public onlySlaughterer {
        require(!pigs[_id].isInspected, "Pig is already inspected");
        pigs[_id].isInspected = true;
        emit PigInspected(_id);
    }
    
    function registerSlaughterer() public {
        slaughterers[msg.sender] = Slaughterer(msg.sender, true);
    }
}
