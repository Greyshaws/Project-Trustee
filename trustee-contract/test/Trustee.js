const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe("End To end contract interaction", function () {
  
  let trusteeFactory, trustee; 

  beforeEach(async function () {
    trusteeFactory = await ethers.getContractFactory("Trustee");
    trustee = await trusteeFactory.deploy();
  });


  it("Creating Will", async function () {
    
    const result = await trustee.add(x, y);
    assert.equal(result, x + y);
  });

 

});

 