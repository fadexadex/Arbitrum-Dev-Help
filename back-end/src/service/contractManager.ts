import fs from "node:fs/promises";
const solc = require("solc");
import path from "path";
import { ethers, JsonRpcProvider } from "ethers";
import { IAbi } from "index";
import { AppError } from "../middlewares/errorHandler";

const compileContract = async (contractPath: string) => {
  const contractContent = await fs.readFile(contractPath, {
    encoding: "utf-8",
  });
  const input = {
    language: "Solidity",
    sources: {
      [path.basename(contractPath)]: {
        content: contractContent,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  const output = await JSON.parse(solc.compile(JSON.stringify(input)));

  if (output.errors) {
    const errors = output.errors.map((error: Error) => error.message);
    fs.unlink(contractPath);
    throw new AppError(
      `Contract compilation errors:\n${errors.join("\n")}`,
      400
    );
  }

  const contract =
    output.contracts[path.basename(contractPath)][
      Object.keys(output.contracts[path.basename(contractPath)])[0]
    ];
  const { abi, evm } = contract;
  fs.unlink(contractPath);

  return { abi, bytecode: evm.bytecode.object };
};

const deployService = async (
  abi: IAbi[],
  bytecode: string,
  privateKey: string
) => {
  try {
    const provider = new JsonRpcProvider(
      "https://sepolia-rollup.arbitrum.io/rpc"
    );
    const wallet = new ethers.Wallet(privateKey, provider);

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();

    await contract.waitForDeployment();

    console.log(`Contract deployed at address: ${contract.target}`);
    return { address: contract.target };
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export { compileContract, deployService };
