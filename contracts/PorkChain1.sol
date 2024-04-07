// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PigChain1 {
    // struct Pig {
    //     uint id;
    //     string breed;
    //     string birthDate;
    //     string healthRecords;
    // }


    // struct Shipment {
    //     uint shipmentID;
    //     address sender;
    //     string source;
    //     string destination;
    //     uint sendDate;
    //     uint estimateArrivalDate;
    //     bool shipmentStatus; // False for pending, true for delivered
    // }

    
    struct Shipment {
        uint shipmentID;
        string source;
        uint destination;
        string sendDate;
        string estimateArrivalDate;
        bool shipmentStatus; // false = pending, true = delivered
    }

    mapping(bytes32 => Shipment) private shipments;

    event ShipmentAdded(bytes32 indexed hash, uint shipmentID, string source, uint destination, string sendDate, string estimateArrivalDate, bool shipmentStatus);

    function addShipment(uint _shipmentID, string memory _source, uint _destination, string memory _sendDate, string memory _estimateArrivalDate, bool _shipmentStatus) public {
        bytes32 hash = keccak256(abi.encodePacked(_shipmentID, _source, _destination, _sendDate, _estimateArrivalDate, _shipmentStatus));
        shipments[hash] = Shipment(_shipmentID, _source, _destination, _sendDate, _estimateArrivalDate, _shipmentStatus);
        emit ShipmentAdded(hash, _shipmentID, _source, _destination, _sendDate, _estimateArrivalDate, _shipmentStatus);
    }

    function getShipment(bytes32 _hash) public view returns (uint shipmentID, string memory source, uint destination, string memory sendDate, string memory estimateArrivalDate, bool shipmentStatus) {
        Shipment memory shipment = shipments[_hash];
        return (shipment.shipmentID, shipment.source, shipment.destination, shipment.sendDate, shipment.estimateArrivalDate, shipment.shipmentStatus);
    }

    // Optional: Getter function to retrieve individual shipment data
    function getShipmentById(uint _shipmentID) public view returns (uint shipmentID, string memory source, uint destination, string memory sendDate, string memory estimateArrivalDate, bool shipmentStatus) {
        bytes32 hash = keccak256(abi.encodePacked(_shipmentID));
        Shipment memory shipment = shipments[hash];
        return (shipment.shipmentID, shipment.source, shipment.destination, shipment.sendDate, shipment.estimateArrivalDate, shipment.shipmentStatus);
    }

}