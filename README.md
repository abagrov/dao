Token: https://rinkeby.etherscan.io/address/0xa3d4213A13FEc9245fCC8a3B2B472692e30C7e75
Dao: https://rinkeby.etherscan.io/address/0x2EdeE64da97847Cb29D80x34f97ff8604cEaB6081B0F23E0A9B0b8B0Ee549726be181D0080788dB0b4

Verify
* npx hardhat verify --network rinkeby --contract "contracts/BadToken.sol:BadToken" 0xa3d4213A13FEc9245fCC8a3B2B472692e30C7e75
* npx hardhat verify --network rinkeby --contract "contracts/Dao.sol:Dao" 0x2EdeE64da97847Cb29D826be181D0080788dB0b4 "0x34f97ff8604cEaB6081B0F23E0A9B0b8B0Ee5497" "0xa3d4213A13FEc9245fCC8a3B2B472692e30C7e75" "10000000000000000" "30"
