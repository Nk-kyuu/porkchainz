// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PorkChain {
   struct Pig {
        uint8 pigID;
        uint8 pigWeight;
        string pigHealth;
        
    }

    Pig[] public pigs;
    uint8 public pigCount;

    event PigAdded(uint8 indexed pigId, uint8 pigWeight, string pigHealth);

    function addPig(uint8 _pigWeight, string memory _pigHealth) public {
        pigCount++;
        pigs.push(Pig(pigCount, _pigWeight, _pigHealth));
        emit PigAdded(pigCount, _pigWeight, _pigHealth);
    }

    function getPigDataById(uint8 _pigId) public view returns (uint8 pigID, uint8 pigWeight, string memory pigHealth) {
        for (uint i = 0; i < pigs.length; i++) {
            if (pigs[i].pigID == _pigId) {
                return (pigs[i].pigID, pigs[i].pigWeight, pigs[i].pigHealth);
            }
        }
        revert("Pig not found");
    }
   
  
}