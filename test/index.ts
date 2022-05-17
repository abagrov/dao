import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { BigNumber, Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

describe("Dao test", function () {
  let dao: Contract, token: Contract;
  let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress;
  const threeDays = 60 * 60 * 24 * 3;
  const debatePeriodDuration = threeDays;
  const mininumQuorum = parseEther("1");
  const reward = parseEther("1");
  const deposit = parseEther("5");

  this.beforeEach(async () => {
    const factory = await ethers.getContractFactory("BadToken");
    token = await factory.deploy();
    await token.deployed();

    [owner, user1, user2] = await ethers.getSigners();
    const factoryDao = await ethers.getContractFactory("Dao");
    dao = await factoryDao.deploy(owner.address, token.address, mininumQuorum, debatePeriodDuration);
    await dao.deployed();

    await token.transfer(user1.address, parseEther("10"));
    await token.transfer(user2.address, parseEther("10"));

    await dao.addProposal(getCalldata(user1.address, reward), token.address, "Test");
    token.mint(dao.address, reward);

    await token.approve(dao.address, parseEther("100"));
    await token.connect(user1).approve(dao.address, parseEther("100"));
    await token.connect(user2).approve(dao.address, parseEther("100"));

    await dao.deposit(deposit);
    await dao.connect(user1).deposit(deposit);
    await dao.connect(user2).deposit(deposit);
  })

  describe("Check", function () {
    it("1. Only chairman can create referendum", async function () {
      await expect(dao.connect(user1).addProposal(getCalldata(owner.address, reward), token.address, "Test")).to.be.reverted;
    });

    it("2. Vote only one time wo deposit", async function () {
      await dao.vote(0, true);
      await expect(dao.vote(0, true)).to.be.reverted;
    });

    it("2. Vote more than one with deposit", async function () {
      await dao.vote(0, true);
      await dao.connect(owner).deposit(parseEther("15"));
      const tx = await (await dao.vote(0, true)).wait();
      const event = tx.events.find((e: { event: string }) => e.event == 'VoteMade');
      expect(event.args.amount).be.eql(parseEther("15"));
    });

    it("3. Withdraw before end should fail", async function () {
      await dao.vote(0, true);
      await expect(dao.withdraw(deposit)).to.be.reverted;
    });


    it("4. Perform vote process", async function () {
      await dao.vote(0, true);
      await dao.connect(user1).vote(0, true);
      await dao.connect(user2).vote(0, false);

      const balance = await token.balanceOf(user1.address);
      await network.provider.send("evm_increaseTime", [debatePeriodDuration]);
      await dao.endVote(0);

      expect(await token.balanceOf(user1.address)).to.be.eql(balance.add(reward));
    });

    it("5. Perform accept vote process and withdraw", async function () {
      await dao.vote(0, true);
      await dao.connect(user1).vote(0, true);
      await dao.connect(user2).vote(0, false);

      const balance = await token.balanceOf(user1.address);
      await network.provider.send("evm_increaseTime", [debatePeriodDuration]);
      await dao.endVote(0);

      expect(await token.balanceOf(user1.address)).to.be.eql(balance.add(reward));

      await expect(dao.withdraw(parseEther("100500"))).to.be.reverted;

      await dao.withdraw(deposit);
      await dao.connect(user1).withdraw(deposit);
      await dao.connect(user2).withdraw(deposit);
      await expect(dao.connect(user2).withdraw(deposit)).to.be.reverted;
    });

    it("6. Perform reject vote process and withdraw", async function () {
      await dao.vote(0, true);
      await dao.connect(user1).vote(0, false);
      await dao.connect(user2).vote(0, false);

      const balance = await token.balanceOf(user1.address);
      await network.provider.send("evm_increaseTime", [debatePeriodDuration]);
      await dao.endVote(0);

      expect(await token.balanceOf(user1.address)).to.be.eql(balance);

      await expect(dao.withdraw(parseEther("100500"))).to.be.reverted;

      await dao.withdraw(deposit);
      await dao.connect(user1).withdraw(deposit);
      await dao.connect(user2).withdraw(deposit);
      await expect(dao.connect(user2).withdraw(deposit)).to.be.reverted;
    });

    it("7. Check min quorum", async function () {
      await dao.withdraw(deposit);
      await dao.deposit(mininumQuorum.div(2));
      await dao.vote(0, true);

      await network.provider.send("evm_increaseTime", [debatePeriodDuration]);

      await expect(dao.endVote(0)).to.be.reverted;
    });

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
});
