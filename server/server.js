// // const app = require("./app");

// // const PORT = process.env.PORT || 5001;

// // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const { ethers } = require('ethers');
const abiCoder = ethers.AbiCoder.defaultAbiCoder();



// Configuration
const remoteEid = 30101; // Example EID, replace with the actual value
const ulnConfig = {
    confirmations: 20, // Example value, replace with actual
    requiredDVNCount: 1, // Example value, replace with actual
    optionalDVNCount: 0, // Example value, replace with actual
    optionalDVNThreshold: 0, // Example value, replace with actual
    requiredDVNs: ['0x589dedbd617e0cbcb916a9223f4d1300c294236b'], // Replace with actual addresses
    optionalDVNs: [], // Replace with actual addresses
};

const executorConfig = {
    maxMessageSize: 20000, // Example value, replace with actual
    executorAddress: '0x173272739Bd7Aa6e4e214714048a9fE699453059', // Replace with the actual executor address
};



// Encode UlnConfig using defaultAbiCoder
const configTypeUlnStruct =
    'tuple(uint64 confirmations, uint8 requiredDVNCount, uint8 optionalDVNCount, uint8 optionalDVNThreshold, address[] requiredDVNs, address[] optionalDVNs)';
const encodedUlnConfig = abiCoder.encode(
    [configTypeUlnStruct],
    [ulnConfig]
);

// Encode ExecutorConfig using defaultAbiCoder
const configTypeExecutorStruct =
    'tuple(uint32 maxMessageSize, address executorAddress)';
const encodedExecutorConfig = abiCoder.encode(
    [configTypeExecutorStruct],
    [executorConfig]
);

// console.log(encodedUlnConfig);
// console.log("/n");
// console.log(encodedExecutorConfig);
const configTypeUlnStruct2 =
    'tuple(uint256 gas)';
 const decoded = abiCoder.decode([configTypeUlnStruct2], "0x0003010011010000000000000000000000000000fde8");

 console.log(decoded);
