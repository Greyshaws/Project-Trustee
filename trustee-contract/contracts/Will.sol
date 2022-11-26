//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//  Test Beneficiaries
//  [[true, 0, 100, 2000, 5000, "First", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"], [true, 0, 100, 2000, 5000, "Second", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"]]


//please add the suitable guards to this code patch any vulnerability you find

contract Trustee {

    struct Beneficiary {
        bool isNft;
        uint256 tokenId;
        uint256 amount;
        uint256 interval;
        uint256 deadline;
        string description;
        address beneficiaryAddress;
        address tokenAddress;
    }
    

    struct Trust {
        string title;
        uint256 interval;
        uint256 deadline;
        bool active;
        uint256 beneficiaryCount;
    }


    mapping(address => Trust) public TrustData;
    mapping(address => mapping(uint256 => Beneficiary)) public beneficiaryData;

    function createTrust (uint256 _interval, string calldata _title, Beneficiary[] calldata _beneficiaries) external {
        require (!TrustData[msg.sender].active, "Address can't have multiple active Trust");
        
        uint256 count = _beneficiaries.length;
        uint256 deadline = block.timestamp + _interval;

        for (uint256 i = 0; i < count; i++) {
            beneficiaryData[msg.sender][i] = _beneficiaries[i];
        }

        TrustData[msg.sender] = Trust(_title, _interval, deadline, true, count);

    }


    function getMyTrust () external view returns(Trust memory) {
        return TrustData[msg.sender];
    }


    // protect against indexes that are out of bound
    function updateMyTrustBeneficiaries (uint256[] calldata _indexes, Beneficiary [] calldata _beneficiaries) external  {

        for (uint256 i = 0; i < _indexes.length; i++) {
            beneficiaryData[msg.sender][_indexes[i]] = _beneficiaries[i];
        }

    }

    // make this work my login is that you should increase the beneficiary count 
    // in the Trust Data mapping and use that lastest value to map the new beneficiary
    function addToMyTrustBeneficiaries (uint256[] calldata _indexes, Beneficiary [] calldata _beneficiaries) external  {

        for (uint256 i = 0; i < _indexes.length; i++) {
            beneficiaryData[msg.sender][_indexes[i]] = _beneficiaries[i];
        }

    }

    function getMyTrustBeneficiaries () external view returns(Beneficiary [] memory) {
        
        uint256 count = TrustData[msg.sender].beneficiaryCount;

        Beneficiary[] memory beneficiaries = new Beneficiary[](count);

        for (uint256 i = 0; i < count; i++) {
            beneficiaries[i] = beneficiaryData[msg.sender][i];
        }
        
        return beneficiaries;
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
    // You should change the name to something appropriate not tested 
    function isTokenApproved (address tokenAddress, address owner) public view returns(bool) {
        if (IERC20(tokenAddress).allowance(owner, address(this)) != 0) {
            return false;
        } else {
            return true;
        }
    }

    
}
