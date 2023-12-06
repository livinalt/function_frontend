const hre = require("hardhat");

async function main() {
  const initBalance = 1;
  const Assessment = await hre.ethers.getContractFactory("wallet_integration");
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`A contract with balance of ${initBalance} eth deployed to ${wallet_integration.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
