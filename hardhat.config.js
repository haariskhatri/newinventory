/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

let accounts = [
  "084b6dfbf06f8127f3ad4fe06c9d08367ffcb108061b2d8769a0aec8aaf12a1f",
];

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/f6f192f81294461f873a6243cfccad29",
      accounts: accounts,
    },
  },
  etherscan: {
    apiKey: "UX6AWTYFUAS99YJYVZ4W3FI8S5RVBP81WB",
  },
};
