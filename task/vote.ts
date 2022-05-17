import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { parseEther } from "ethers/lib/utils";
import { task, types } from "hardhat/config";

task("vote", "")
    .addParam("contractAddr", "Address of the deployed contract", "0x2EdeE64da97847Cb29D826be181D0080788dB0b4")
    .addParam("id", "Id of referendum", "0")
    .addParam("accepted", "1 or 0", "1")
    .setAction(async (taskArgs, hre) => {
        const dao = await getContractAt(hre, "Dao", taskArgs['contractAddr']);
        const tx = await dao.vote(taskArgs['id'], taskArgs['accepted'] == "1");
        console.log(tx.hash);
    });