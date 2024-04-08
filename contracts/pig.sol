// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PorkChain {

    struct Pig {
        uint8 pigID;
        uint8 pigWeight;
        string pigHealth;
    }

    struct Product {
        uint8 productID;
        uint8 productWeight;
        string productName;
    }

    struct Shipment {
        uint8 shipmentID; 
        uint8 destination;
        string source;
    }

    Pig[] public pigs;
    Product[] public products;
    Shipment[] public shipments;
    uint8 public pigCount;
    uint8 public productCount;
    uint8 public shipmentCount;

    event PigAdded(uint8 indexed pigId, uint8 pigWeight, string pigHealth);
    event ProductAdded(uint8 indexed productID, uint8 indexed productWeight , string productName);
    event ShipmentCreated(uint8 indexed shipmentId, uint8 destination, string source);

    function addPig(uint8 _pigWeight, string memory _pigHealth) public {
        pigCount++;
        pigs.push(Pig(pigCount, _pigWeight, _pigHealth));
        emit PigAdded(pigCount, _pigWeight, _pigHealth);
    }

    function addProduct(uint8 _productWeight, string memory _productName) public {
        productCount++;
        products.push(Product(productCount, _productWeight, _productName));
        emit ProductAdded(productCount, _productWeight, _productName);
    }
    
    function addShipment(uint8 _destination, string memory _source) public {
        shipmentCount++;
        shipments.push(Shipment(shipmentCount, _destination, _source));
        emit ShipmentCreated(shipmentCount, _destination, _source);
    }

    function getPigDataById(uint8 _pigId) public view returns (uint8 pigID, uint8 pigWeight, string memory pigHealth) {
        for (uint i = 0; i < pigs.length; i++) {
            if (pigs[i].pigID == _pigId) {
                return (pigs[i].pigID, pigs[i].pigWeight, pigs[i].pigHealth);
            }
        }
        revert("Pig not found");
    }   

    function getProductDataById(uint8 _productID) public view returns (uint8 productID, uint8 productWeight, string memory productName) {
        for (uint i = 0; i < products.length; i++) {
            if (products[i].productID == _productID) {
                return (products[i].productID, products[i].productWeight, products[i].productName);
            }
        }
        revert("Product not found");
    }

    function getShipmentDataById(uint8 _shipmentId) public view returns (uint8, uint8, string memory) {
        require(_shipmentId > 0 && _shipmentId <= shipmentCount, "Invalid shipment ID");
        for (uint i = 0; i < shipments.length; i++) {
            if (shipments[i].shipmentID == _shipmentId) {
                return (shipments[i].shipmentID, shipments[i].destination, shipments[i].source);
            }
        }
        revert("Shipment not found");
    }
}


