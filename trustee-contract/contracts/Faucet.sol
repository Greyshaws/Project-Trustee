// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Faucet is ERC20 {
    mapping(address => bool) public rewardedAddresses;
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}
    function mint(address receiver) public {
        require(!rewardedAddresses[receiver], "User has already been rewarded!!");
        _mint(receiver, 100000 * 100 ** 18);
        rewardedAddresses[receiver] = true;
    }

    function supply() public view returns(uint256){
        return totalSupply();
    }
}
