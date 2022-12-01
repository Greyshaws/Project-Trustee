//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Trustee is ReentrancyGuard, Ownable {

    //cron period time
    enum Period {
        MINUTE_5,
        MINUTE_10,
        MINUTE_30,
        HOUR_1,
        DAY_1,
        WEEK_1,
        MONTH_1,
        MONTH_3,
        MONTH_6,
        YEAR_1
    }

    struct Beneficiary {
        bool isNft;
        uint256 tokenId;
        uint256 amount;
        string description;
        address beneficiaryAddress;
        address NftAddress;
    }

    struct Trust{
        uint256 deadline;
        uint256 duration;
        uint256 amount;
        string title;
        string description;
        bool active;
        uint256 beneficiaryCount;
        Period period;
    }

    //for tracking subscription
    struct Subscription {
        address subscriber;
        Period period;
        uint256 price;
    }

    mapping(address => Trust) public TrustData;
    mapping(address => mapping(uint256 => Beneficiary)) private BeneficiaryData;

    //for tracking subscription
    mapping(uint256 => Subscription) public subscriptionData;

    uint256 public subscriptionPrice = 1 ether;
    uint256 public pricePerBeneficiary = 0.001 ether;

    uint256 public subscriptionCount = 0;

    // This contract address is the one on our server, it's the address that interact with our contact from
    // time to time, my idea is that this contract should be credited with some percentage matic once a user pays
    // so that this address always have matic to pay for gas fees.
    address public automator;
    uint256 accumulator;

    
    //event CreateTrust(address indexed _owner, address _beneficiary, uint256 value, uint256 deadline, uint256 duration, string description);
    //event ActivateTrust(address indexed _owner, address _beneficiary, uint256 value, uint256 deadline);
    //event AddAdditionalFunds(address indexed _owner, uint256 newFunds, uint256 totalValue, uint256 deadline);

    function periodInSecs() private view returns (Period){
        // for (uint256 i = 0; i < type(Period).max; i++) {
            
        // }
        // string memory length = type(Period).max;
        return type(Period).max;
    // console.log(Period(_period));
    }
    
    function trustStatus() public view returns(bool, uint256){
       bool deadline;
       if(TrustData[msg.sender].deadline == block.timestamp){
        deadline = true;
       }else{
        deadline = false;
       }
    return (deadline, TrustData[msg.sender].beneficiaryCount);
    }


    modifier transfer {
        if(msg.value > 0){
        accumulator += (msg.value * 50 / 100);
        _;
        }else{
            revert("Insufficient funds to create trust");
        }
    }

    modifier subscriptionCheck {
        require(msg.value >= subscriptionPrice, "Amount should be equal to subscription Price");
        _;
    }

    //at the expiration of the deadline, the funds will be released to the beneficiary's address.
    function createTrust(uint256 _duration, Beneficiary[] calldata _beneficiaries, string calldata _description, string calldata _title, uint256 _period) payable external transfer{
        require(_duration > 0, "Set duration");
        //require(msg.sender != _beneficiaries, "User cannot be beneficiary");
        require(!TrustData[msg.sender].active, "Address can't have multiple active trusts");

        uint256 count = _beneficiaries.length;
        uint256 _deadline = block.timestamp + _duration;

        for (uint256 i = 0; i < count; i++) {
            BeneficiaryData[msg.sender][i] = _beneficiaries[i];
        }

        TrustData[msg.sender] = Trust(_deadline, _duration, msg.value, _title, _description, true, count, Period(_period));

        //emit CreateTrust(msg.sender, _beneficiary, msg.value, _deadline, _duration, _description);

    }

    //get Trust Details
    function getMyTrust() external view returns(Trust memory) {
        return TrustData[msg.sender];
    }

     // protect against indexes that are out of bound
    function updateMyTrustBeneficiaries (uint256[] calldata _indexes, Beneficiary [] calldata _beneficiaries) public {
        uint256 count = TrustData[msg.sender].beneficiaryCount;
        for (uint256 i = 0; i < _indexes.length; i++) {
            if (_indexes[i] > count) continue;
            BeneficiaryData[msg.sender][_indexes[i]] = _beneficiaries[i];
        }
    }

    function addToMyTrustBeneficiaries (Beneficiary [] calldata _beneficiaries) public  {
        uint256 count = TrustData[msg.sender].beneficiaryCount;
        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            BeneficiaryData[msg.sender][count + i] = _beneficiaries[i];
        }
    }

    function getMyTrustBeneficiaries () public view returns(Beneficiary [] memory) {
        uint256 count = TrustData[msg.sender].beneficiaryCount;
        Beneficiary[] memory beneficiaries = new Beneficiary[](count);
        for (uint256 i = 0; i < count; i++) {
            beneficiaries[i] = BeneficiaryData[msg.sender][i];
        }
        return beneficiaries;
    }

    //deposit additional funds
    function addAdditionalFunds() payable external transfer{
        Trust storage userDetails = TrustData[msg.sender];
        require(userDetails.amount > 0, "Not enough ETH");
        require(block.timestamp <= userDetails.deadline, "Past deadline already");

        userDetails.amount += msg.value;

        //emit AddAdditionalFunds(msg.sender, msg.value, userDetails.amount, userDetails.deadline);
    }

    //NFT Section
    function isNftApproved (address _nftAddress, uint256 _tokenId) public view returns(bool) {
        if (IERC721(_nftAddress).getApproved(_tokenId) != address(this)) {
            return false;
        } else {
            return true;
        }
    }

    //Token section
    function getApprovedTokens(address tokenAddress, address owner) public view returns(uint256) {
        return IERC20(tokenAddress).allowance(owner, address(this));
    }


    // Admin Functions
    function setSubcriptionPrice (uint256 _price) external onlyOwner {
        subscriptionPrice = _price;
    }

    function setPricePerBeneficiary (uint256 _price) external onlyOwner {
        pricePerBeneficiary = _price;
    }

    function setAutomator (address _automator) external onlyOwner {
        automator = _automator;
    }

    // transfer asset to beneficiaries
    // implement for NFTs and Tokens
    function bulkTransfers (address _willOwner) public view {
        Trust memory trust = TrustData[_willOwner];
        require(trust.amount > 0);
        require(block.timestamp > trust.deadline, "Not past deadline");

        //uint256 amountToSend = TrustData[msg.sender].amount;
        //uint256 count = TrustData[_willOwner].beneficiaryCount;

        /*for (uint256 i = 0; i < count; i++) {
            trust[i].transfer(TrustData[_willOwner][i]);
        }*/
        //Beneficiary memory beneficiaryData[_willOwner][_indexes[i]] = _beneficiaries[i];

    }

    function singleTransfer (address _willOwner, uint256 _beneficiaryIndex) public {
        Beneficiary memory beneficiary =  BeneficiaryData[_willOwner][_beneficiaryIndex];
    }

    // This fuction should increase timer for the will
    function paySubscription () payable external transfer subscriptionCheck {
        Trust memory trust = TrustData[msg.sender];
        ++subscriptionCount;

        subscriptionData[subscriptionCount] =  Subscription(msg.sender, trust.period, msg.value);
    }


    //for tracking subscription
    function getSubscriptions (uint256 start, uint256 end) external view returns(Subscription[] memory) {
        uint256 count = end - start;
        Subscription[] memory subscription = new Subscription[](count);
        uint256 counter = 0;
        for (uint256 i = start; i < end; i++) {
            subscription[counter++] = subscriptionData[i];
        }
        return subscription;
    }
}

