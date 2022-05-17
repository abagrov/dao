import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { parseEther } from "ethers/lib/utils";
import { task, types } from "hardhat/config";

task("end", "End referendum")
    .addParam("contractAddr", "Address of the deployed contract", "0x2EdeE64da97847Cb29D826be181D0080788dB0b4")
    .addParam("id", "Id of referendum", "1")
    .setAction(async (taskArgs, hre) => {
        const dao = await getContractAt(hre, "Dao", taskArgs['contractAddr']);
        const tx = await dao.endVote(taskArgs['id']);
        console.log(tx.hash);
    });