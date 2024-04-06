// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    address public owner;

    address public farmer;
    address public slaughterer;
    address public retailer;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyFarmer() {
        require(msg.sender == farmer, "Only farmer can call this function");
        _;
    }

    modifier onlySlaughterer() {
        require(msg.sender == slaughterer, "Only slaughterer can call this function");
        _;
    }

    modifier onlyRetailer() {
        require(msg.sender == retailer, "Only retailer can call this function");
        _;
    }

    struct Pig {
        uint8 pigID;
        uint8 pigWeight;
        string pigStartDate;
        string pigEndDate;
        string pigBreed;
        string pigHealth;
        uint8 batchID;
    }

    struct Batch {
        uint8 batchID;
        string batchName;
        uint8 batchWeight;
        uint8 batchQuantity;
        string batchDescription;
        uint8[] pigIDs;
    }
    
    struct Product {
        uint8 productID;
        uint8 batchID;
        string productName;
        uint8 productWeight;
        string productDate;
    }

    Pig[] public pigs;
    Batch[] public batches;
    Product[] public products;
    uint8 public pigCount;
    uint8 public batchCount;
    uint8 public productCount;
    uint256 public shipmentCount;

    event PigAdded(uint8 indexed pigId, uint8 pigWeight, string pigStartDate, string pigHealth, string pigEndDate, string pigBreed, uint8 batchID);
    event BatchAdded(uint8 indexed batchId, string batchName, uint8 batchWeight, uint8 batchQuantity, string batchDescription);
    event ProductAdded(uint8 productID, uint8 batchID, string productName, uint8 productWeight, string productDate);
    event ShipmentSent(uint256 shipmentID, uint256 productID, uint256 batchID, string source, string destination, string sendDate, string estimateArrivalDate);

    function setFarmer(address _farmer) external {
        require(msg.sender == owner, "Only contract owner can set the farmer address");
        farmer = _farmer;
    }

    function setSlaughterer(address _slaughterer) external {
        require(msg.sender == owner, "Only contract owner can set the slaughterer address");
        slaughterer = _slaughterer;
    }

    function setRetailer(address _retailer) external {
        require(msg.sender == owner, "Only contract owner can set the retailer address");
        retailer = _retailer;
    }

    function addPig(uint8 _pigWeight, string memory _pigStartDate, string memory _pigEndDate, string memory _pigBreed, string memory _pigHealth, uint8 _batchID) public onlyFarmer {
        pigCount++;
        pigs.push(Pig(pigCount, _pigWeight, _pigStartDate, _pigEndDate, _pigBreed, _pigHealth, _batchID));
        emit PigAdded(pigCount, _pigWeight, _pigStartDate, _pigHealth, _pigEndDate, _pigBreed, _batchID);
    }

    function addBatch(string memory _batchName, string memory _batchDescription, uint8[] memory _pigIDs) public onlyFarmer {
        uint8 totalWeight;
        uint8 totalPigs = uint8(_pigIDs.length);

        for (uint8 i = 0; i < totalPigs; i++) {
            totalWeight += pigs[_pigIDs[i] - 1].pigWeight;
        }

        batchCount++;


        batches.push(Batch(batchCount, _batchName, totalWeight, totalPigs, _batchDescription, _pigIDs));

        emit BatchAdded(batchCount, _batchName, totalWeight, totalPigs, _batchDescription);

        for (uint8 i = 0; i < totalPigs; i++) {
            pigs[_pigIDs[i] - 1].batchID = batchCount;
            emit PigAdded(pigs[_pigIDs[i] - 1].pigID, pigs[_pigIDs[i] - 1].pigWeight, pigs[_pigIDs[i] - 1].pigStartDate, pigs[_pigIDs[i] - 1].pigHealth, pigs[_pigIDs[i] - 1].pigEndDate, pigs[_pigIDs[i] - 1].pigBreed, batchCount);
        }
    }

    function addProduct(uint8 _batchID, string memory _productName, uint8 _productWeight, string memory _productDate) public onlySlaughterer {
        require(_batchID > 0 && _batchID <= batchCount, "Invalid batch ID");
        
        productCount++;
        products.push(Product(productCount, _batchID, _productName, _productWeight, _productDate));
        emit ProductAdded(productCount, _batchID, _productName, _productWeight, _productDate);
    }

    function sendShipment(uint8 _productID, string memory _source, string memory _destination, string memory _sendDate, string memory _estimateArrivalDate) public onlySlaughterer {
        shipmentCount++;
        uint8 batchID;
        for(uint8 i = 0; i < products.length; i++) {
            if(products[i].productID == _productID) {
                batchID = products[i].batchID;
                break;
            }
        }
        emit ShipmentSent(shipmentCount, _productID, batchID, _source, _destination, _sendDate, _estimateArrivalDate);
    }
    function getShipmentJourney(uint256 _shipmentID) public view onlyRetailer returns (Pig memory, Batch memory, Product memory) {
        require(_shipmentID > 0 && _shipmentID <= shipmentCount, "Invalid shipment ID");

        uint8 index = uint8(_shipmentID) - 1; 

        Pig memory pig = pigs[index];

        Batch memory batch = batches[pig.batchID - 1];

        Product memory product;
        for(uint8 i = 0; i < products.length; i++) {
            if(products[i].batchID == batch.batchID) {
                product = products[i];
                break;
            }
        }

        return (pig, batch, product);
    }
}
