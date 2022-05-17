import { task, types } from "hardhat/config";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { parseEther } from "ethers/lib/utils";
import { BigNumber, ethers } from "ethers";

task("addProposal", "Buy marketplace item")
    .addParam("contractAddr", "Address of the deployed contract", "0x2EdeE64da97847Cb29D826be181D0080788dB0b4")
    .addParam("recipient", "Address of contract recipient", "0xa3d4213A13FEc9245fCC8a3B2B472692e30C7e75")
    .addParam("calldataTo", "Id of item to list", "0x34f97ff8604cEaB6081B0F23E0A9B0b8B0Ee5497 ")
    .addParam("calldataAmount", "Price to pay", "0.001")
    .addParam("description", "Price to pay", "0.001")

    .setAction(async (taskArgs, hre) => {
        const dao = await getContractAt(hre, "Dao", taskArgs['contractAddr']);
        const calldata = getCalldata(taskArgs.calldataTo, parseEther(taskArgs.calldataAmount));
        const tx = await dao.addProposal(calldata, taskArgs.recipient, taskArgs.description);
        console.log(tx.hash);
    });

function getCalldata(to: string, amount: BigNumber) {
    var jsonAbi = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ];

    return new ethers.utils.Interface(jsonAbi).encodeFunctionData('transfer', [to, amount]);
}