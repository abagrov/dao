import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { parseEther } from "ethers/lib/utils";
import { task, types } from "hardhat/config";

task("withdraw", "")
    .addParam("contractAddr", "Address of the deployed contract", "0x2EdeE64da97847Cb29D826be181D0080788dB0b4")
    .addParam("amount", "Amount", "0.01")
    .setAction(async (taskArgs, hre) => {
        const dao = await getContractAt(hre, "Dao", taskArgs['contractAddr']);
        const amount = parseEther(taskArgs.amount);

        
        const tx = await dao.withdraw(amount);
        console.log(tx.hash);
    });