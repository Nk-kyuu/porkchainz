// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PorkChain {
   struct Pig {
        uint8 pigID;
        uint8 pigWeight;
        string pigHealth;
   }

    struct Shipment {
        uint8 shipmentID; 
        uint8 destination;
        string source;
    }

    Shipment[] private shipments;
    uint8 private shipmentCount;

    event ShipmentCreated(uint8 indexed shipmentId, uint8 destination, string source);

    function addShipment(uint8 _destination, string memory _source) public {
        shipmentCount++;
        shipments.push(Shipment(shipmentCount, _destination, _source));
        emit ShipmentCreated(shipmentCount, _destination, _source);
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
   

   struct Product {
        uint8 productID;
        uint8 productWeight;
        string productName;
    }

    Product[] public products;
    uint8 public productCount;

    event ProductAdded(uint8 indexed productID, uint8 indexed productWeight , string productName);

    // Function to add a product (only callable by slaughterer)
    function addProduct(uint8 _productWeight, string memory _productName) public {
        productCount++;
        products.push(Product(productCount, _productWeight, _productName));
        emit ProductAdded(productCount, _productWeight, _productName);
    }

    // Function to get product data by ID
    function getProductDataById(uint8 _productID) public view returns (uint8 productID, uint8 productWeight, string memory productName) {
        for (uint i = 0; i < products.length; i++) {
            if (products[i].productID == _productID) {
                return (products[i].productID, products[i].productWeight, products[i].productName);
            }
        }
        revert("Product not found");
    }

}



    // struct Shipment {
    //     uint8 shipmentID;
    //     string source;
    //     uint8 destination;
    //     string sendDate;
    //     string estimateArrivalDate;
    // }

    // Shipment[] public shipments;
    // uint8 public shipmentCount;

    // event ShipmentCreated(uint8 indexed shipmentId, string source, uint8 destination, string sendDate, string estimateArrivalDate);

    // // Function to add a new shipment
    // function addShipment(string memory _source, uint8 _destination, string memory _sendDate, string memory _estimateArrivalDate) public {
    //     shipmentCount++;
    //     shipments.push(Shipment(shipmentCount, _source, _destination, _sendDate, _estimateArrivalDate));
    //     emit ShipmentCreated(shipmentCount, _source, _destination, _sendDate, _estimateArrivalDate);
    // }

    // // Function to get shipment data by ID
    // function getShipmentDataById(uint8 _shipmentId) public view returns (uint8, string memory, uint8, string memory, string memory) {
    //     for (uint i = 0; i < shipments.length; i++) {
    //         if (shipments[i].shipmentID == _shipmentId) {
    //             return (shipments[i].shipmentID, shipments[i].source, shipments[i].destination, shipments[i].sendDate, shipments[i].estimateArrivalDate);
    //         }
    //     }
    //     revert("Shipment not found");
    // }

