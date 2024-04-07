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


// // SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;

// contract PigChain1 {
    
//     struct Shipment {
//         uint shipmentID;
//         string source;
//         uint destination;
//         string sendDate;
//         string estimateArrivalDate;
//         bool shipmentStatus; // false = pending, true = delivered
//     }

//     mapping(bytes32 => Shipment) private shipments;

//     event ShipmentAdded(bytes32 indexed hash, uint shipmentID, string source, uint destination, string sendDate, string estimateArrivalDate, bool shipmentStatus);

//     function addShipment(uint _shipmentID, string memory _source, uint _destination, string memory _sendDate, string memory _estimateArrivalDate, bool _shipmentStatus) public {
//         bytes32 hash = keccak256(abi.encodePacked(_shipmentID, _source, _destination, _sendDate, _estimateArrivalDate, _shipmentStatus));
//         shipments[hash] = Shipment(_shipmentID, _source, _destination, _sendDate, _estimateArrivalDate, _shipmentStatus);
//         emit ShipmentAdded(hash, _shipmentID, _source, _destination, _sendDate, _estimateArrivalDate, _shipmentStatus);
//     }

//     function getShipment(bytes32 _hash) public view returns (uint shipmentID, string memory source, uint destination, string memory sendDate, string memory estimateArrivalDate, bool shipmentStatus) {
//         Shipment memory shipment = shipments[_hash];
//         return (shipment.shipmentID, shipment.source, shipment.destination, shipment.sendDate, shipment.estimateArrivalDate, shipment.shipmentStatus);
//     }

//     // Optional: Getter function to retrieve individual shipment data
//     function getShipmentById(uint _shipmentID) public view returns (uint shipmentID, string memory source, uint destination, string memory sendDate, string memory estimateArrivalDate, bool shipmentStatus) {
//         bytes32 hash = keccak256(abi.encodePacked(_shipmentID));
//         Shipment memory shipment = shipments[hash];
//         return (shipment.shipmentID, shipment.source, shipment.destination, shipment.sendDate, shipment.estimateArrivalDate, shipment.shipmentStatus);
//     }

// }