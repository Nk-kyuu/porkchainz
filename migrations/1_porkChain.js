const porkChain = artifacts.require("PorkChain");

module.exports = function (deployer) {
    deployer.deploy(porkChain);
};
