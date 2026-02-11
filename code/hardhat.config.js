require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-viem");

const { vars } = require("hardhat/config");

const owner1Key = vars.get("OWNER_1_PRIVATE_KEY"); 
const owner2Key = vars.get("OWNER_2_PRIVATE_KEY");
const owner3Key = vars.get("OWNER_3_PRIVATE_KEY");
const INFURA_API_KEY = vars.get("INFURA_API_KEY"); // Récupère la clé Infura depuis les variables d'environnement
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [owner1Key, owner2Key, owner3Key],
    },
  },
  etherscan: {
    apiKey: vars.get("ETHERSCAN_API_KEY"), // Il te faudra une clé Etherscan gratuite
  },
};