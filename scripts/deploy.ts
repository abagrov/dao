import { getAddress, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
const { OWNER_ADDRESS } = process.env;

async function main() {

  const address = OWNER_ADDRESS!;
  const thirtySeconds = 30;
  const factoryToken = await ethers.getContractFactory("BadToken");
  const token = await factoryToken.deploy();
  await token.deployed();

  const factoryDao = await ethers.getContractFactory("Dao");
  const dao = await factoryDao.deploy(address, token.address, parseEther("0.01"), thirtySeconds);
  await dao.deployed();

  console.log(`Token deployed to: ${token.address}, Dao deployed to: ${dao.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
