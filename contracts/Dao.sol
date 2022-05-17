//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Dao {
    address private chairman;
    address private voteToken;
    uint256 private mininumQuorum;
    uint256 private debatePeriodDuration;

    uint256 private numVotes;

    struct Referendum {
        bytes callData;
        address recipient;
        string description;
        uint256 endDate;
        uint256 acceptCount;
        uint256 rejectCount;
        bool ended;
    }

    struct Deposit {
        uint256 totalDeposit;
        uint256 holdDuration;
    }

    mapping(uint256 => Referendum) private referendums;
    mapping(address => Deposit) private deposits;
    mapping(uint256 => mapping(address => uint256)) private votes;

    event ReferendumCreated(uint256 indexed id, string description);
    event VoteMade(
        uint256 indexed id,
        address voter,
        uint256 amount,
        bool accept
    );
    event ReferendumEnded(uint256 indexed id, bool decision, bool successCall);

    constructor(
        address _chairman,
        address _voteToken,
        uint256 _minimumQuorum,
        uint256 _debatePeriodDuration
    ) {
        chairman = _chairman;
        voteToken = _voteToken;
        mininumQuorum = _minimumQuorum;
        debatePeriodDuration = _debatePeriodDuration;
    }

    function deposit(uint256 _amount) external {
        IERC20(voteToken).transferFrom(msg.sender, address(this), _amount);
        deposits[msg.sender].totalDeposit += _amount;
    }

    function withdraw(uint256 _amount) external {
        require(
            deposits[msg.sender].holdDuration < block.timestamp,
            "You funds are locked, try later."
        );
        require(
            deposits[msg.sender].totalDeposit >= _amount,
            "You deposit is less."
        );

        deposits[msg.sender].totalDeposit -= _amount;
        IERC20(voteToken).transfer(msg.sender, _amount);
    }

    function addProposal(
        bytes memory _callData,
        address _recipient,
        string memory _description
    ) external {
        require(msg.sender == chairman, "You are not chairman.");

        Referendum storage v = referendums[numVotes];
        v.callData = _callData;
        v.recipient = _recipient;
        v.description = _description;
        v.endDate = block.timestamp + debatePeriodDuration;

        emit ReferendumCreated(numVotes, _description);

        numVotes++;
    }

    function vote(uint256 _id, bool _accept) external {
        require(_id <= numVotes, "Wrong _id was provided.");
        Deposit memory d = deposits[msg.sender];

        require(d.totalDeposit >= 1, "Please transfer some funds first.");

        Referendum storage v = referendums[_id];
        require(!v.ended, "Referendum already ended.");

        uint256 add;
        if (votes[_id][msg.sender] == 0) {
            add = d.totalDeposit;
        } else {
            require(
                d.totalDeposit > votes[_id][msg.sender],
                "You already used all balance."
            );
            add = d.totalDeposit - votes[_id][msg.sender];
        }

        d.holdDuration = d.holdDuration > v.endDate
            ? d.holdDuration
            : v.endDate;

        votes[_id][msg.sender] += add;

        if (_accept) {
            v.acceptCount += add;
        } else {
            v.rejectCount += add;
        }

        emit VoteMade(_id, msg.sender, add, _accept);
    }

    function endVote(uint256 _id) external {
        require(_id <= numVotes, "Wrong id was provided.");
        Referendum storage v = referendums[_id];
        require(
            block.timestamp >= v.endDate,
            "Referendum can not end right now."
        );

        require(
            v.acceptCount + v.rejectCount >= mininumQuorum,
            "Minimum quorum requirement not met."
        );

        require(v.acceptCount != v.rejectCount, "Parity of votes.");

        bool decision = v.acceptCount > v.rejectCount;
        bool successCall = false;
        if (decision) {
            (successCall, ) = v.recipient.call(v.callData);
        }

        emit ReferendumEnded(_id, decision, successCall);
    }
}
