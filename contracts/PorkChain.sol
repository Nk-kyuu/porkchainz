// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PorkChain {
   struct Pig {
        uint8 pigID;
        uint8 pigWeight;
        string pigHealth;
        string pigBreed;
    }

    Pig[] public pigs;
    uint8 public pigCount;

    event PigAdded(uint8 indexed pigId, uint8 pigWeight, string pigHealth,string pigBreed);

    function addPig(uint8 _pigWeight, string memory _pigHealth,string memory _pigBreed) public {
        pigCount++;
        pigs.push(Pig(pigCount, _pigWeight, _pigHealth, _pigBreed));
        emit PigAdded(pigCount, _pigWeight, _pigHealth, _pigBreed);
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

// contract PorkChain {
//     struct Pig {
//         uint8 pigID;
//         uint8 pigWeight;
//         string pigHealth;
//     }

//     Pig[] public pigs;
//     uint8 public pigCount;

//     event PigAdded(uint8 indexed pigId, uint8 pigWeight, string pigHealth);

//     function addPig(uint8 _pigWeight, string memory _pigHealth) public {
//         pigCount++;
//         pigs.push(Pig(pigCount, _pigWeight, _pigHealth));
//         emit PigAdded(pigCount, _pigWeight, _pigHealth);
//     }

//     function getPigDataById(uint8 _pigId) public view returns (uint8 pigID, uint8 pigWeight, string memory pigHealth) {
//         for (uint i = 0; i < pigs.length; i++) {
//             if (pigs[i].pigID == _pigId) {
//                 return (pigs[i].pigID, pigs[i].pigWeight, pigs[i].pigHealth);
//             }
//         }
//         revert("Pig not found");
//     }
// }
// contract PorkChain {
//     address public owner;

//     struct Pig {
//         uint8 pigID;
//         uint8 pigWeight;
//         string pigStartDate;
//         string pigEndDate;
//         string pigBreed;
//         string pigHealth;
//         uint8 batchID;
//     }

//     struct Batch {
//         uint8 batchID;
//         string batchName;
//         uint8 batchWeight;
//         uint8 batchQuantity;
//         string batchDescription;
//         uint8[] pigIDs;
//     }
    
//     struct Product {
//         uint8 productID;
//         uint8 batchID;
//         string productName;
//         uint8 productWeight;
//         string productDate;
//     }

//     Pig[] public pigs;
//     Batch[] public batches;
//     Product[] public products;
//     uint8 public pigCount;
//     uint8 public batchCount;
//     uint8 public productCount;
//     uint256 public shipmentCount;

//     event PigAdded(uint8 indexed pigId, uint8 pigWeight, string pigStartDate, string pigHealth, string pigEndDate, string pigBreed, uint8 batchID);
//     event BatchAdded(uint8 indexed batchId, string batchName, uint8 batchWeight, uint8 batchQuantity, string batchDescription);
//     event ProductAdded(uint8 productID, uint8 batchID, string productName, uint8 productWeight, string productDate);
//     event ShipmentSent(uint256 shipmentID, uint256 productID, uint256 batchID, string source, string destination, string sendDate, string estimateArrivalDate);

//     constructor() {
//         owner = msg.sender;
//     }

//     function addPig(uint8 _pigWeight, string memory _pigStartDate, string memory _pigEndDate, string memory _pigBreed, string memory _pigHealth, uint8 _batchID) public {
//         pigCount++;
//         pigs.push(Pig(pigCount, _pigWeight, _pigStartDate, _pigEndDate, _pigBreed, _pigHealth, _batchID));
//         emit PigAdded(pigCount, _pigWeight, _pigStartDate, _pigHealth, _pigEndDate, _pigBreed, _batchID);
//     }

//     function addBatch(string memory _batchName, string memory _batchDescription, uint8[] memory _pigIDs) public {
//         uint8 totalWeight;
//         uint8 totalPigs = uint8(_pigIDs.length);

//         for (uint8 i = 0; i < totalPigs; i++) {
//             totalWeight += pigs[_pigIDs[i] - 1].pigWeight;
//         }

//         batchCount++;

//         batches.push(Batch(batchCount, _batchName, totalWeight, totalPigs, _batchDescription, _pigIDs));

//         emit BatchAdded(batchCount, _batchName, totalWeight, totalPigs, _batchDescription);

//         for (uint8 i = 0; i < totalPigs; i++) {
//             pigs[_pigIDs[i] - 1].batchID = batchCount;
//             emit PigAdded(pigs[_pigIDs[i] - 1].pigID, pigs[_pigIDs[i] - 1].pigWeight, pigs[_pigIDs[i] - 1].pigStartDate, pigs[_pigIDs[i] - 1].pigHealth, pigs[_pigIDs[i] - 1].pigEndDate, pigs[_pigIDs[i] - 1].pigBreed, batchCount);
//         }
//     }

//     function addProduct(uint8 _batchID, string memory _productName, uint8 _productWeight, string memory _productDate) public {
//         require(_batchID > 0 && _batchID <= batchCount, "Invalid batch ID");
        
//         productCount++;
//         products.push(Product(productCount, _batchID, _productName, _productWeight, _productDate));
//         emit ProductAdded(productCount, _batchID, _productName, _productWeight, _productDate);
//     }

//     function sendShipment(uint8 _productID, string memory _source, string memory _destination, string memory _sendDate, string memory _estimateArrivalDate) public {
//         shipmentCount++;
//         uint8 batchID;
//         for(uint8 i = 0; i < products.length; i++) {
//             if(products[i].productID == _productID) {
//                 batchID = products[i].batchID;
//                 break;
//             }
//         }
//         emit ShipmentSent(shipmentCount, _productID, batchID, _source, _destination, _sendDate, _estimateArrivalDate);
//     }

//     function getShipmentJourney(uint256 _shipmentID) public view returns (
//     uint8 pigID,
//     string memory pigStartDate,
//     uint8 pigWeight,
//     string memory pigEndDate,
//     uint8 pigBatchID,
//     string memory pigHealth,
//     uint8 batchID,
//     string memory batchName,
//     uint8 batchQuantity,
//     string memory productDate
// ) {
//     require(_shipmentID > 0 && _shipmentID <= shipmentCount, "Invalid shipment ID");

//     uint8 index = uint8(_shipmentID) - 1; 

//     Pig memory pig = pigs[index];

//     Batch memory batch = batches[pig.batchID - 1];

//     Product memory product;
//     for(uint8 i = 0; i < products.length; i++) {
//         if(products[i].batchID == batch.batchID) {
//             product = products[i];
//             break;
//         }
//     }

//     return (
//         pig.pigID,
//         pig.pigStartDate,
//         pig.pigWeight,
//         pig.pigEndDate,
//         pig.batchID,
//         pig.pigHealth,
//         batch.batchID,
//         batch.batchName,
//         batch.batchQuantity,
//         product.productDate
//     );
// }

//}
//         string pigHealth;
//     }

//     Pig[] public pigs;
//     uint8 public pigCount;

//     event PigAdded(uint8 indexed pigId, uint8 pigWeight, string pigHealth);

//     function addPig(uint8 _pigWeight, string memory _pigHealth) public {
//         pigCount++;
//         pigs.push(Pig(pigCount, _pigWeight, _pigHealth));
//         emit PigAdded(pigCount, _pigWeight, _pigHealth);
//     }

//     function getPigDataById(uint8 _pigId) public view returns (uint8 pigID, uint8 pigWeight, string memory pigHealth) {
//         for (uint i = 0; i < pigs.length; i++) {
//             if (pigs[i].pigID == _pigId) {
//                 return (pigs[i].pigID, pigs[i].pigWeight, pigs[i].pigHealth);
//             }
//         }
//         revert("Pig not found");
//     }
// }
