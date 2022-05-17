import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { parseEther } from "ethers/lib/utils";
import { task, types } from "hardhat/config";

task("deposit", "")
    .addParam("contractAddr", "Address of the deployed contract", "0x2EdeE64da97847Cb29D826be181D0080788dB0b4")
    .addParam("amount", "Amount", "0.01")
    .addParam("tokenAddr", "Address of token", "0xa3d4213A13FEc9245fCC8a3B2B472692e30C7e75")
    .setAction(async (taskArgs, hre) => {
        const dao = await getContractAt(hre, "Dao", taskArgs['contractAddr']);
        const amount = parseEther(taskArgs.amount);

        const token = await getContractAt(hre, "BadToken", taskArgs['tokenAddr']);
        await token.approve(dao.address, amount);
        
        const tx = await dao.deposit(amount);
        console.log(tx.hash);
    });