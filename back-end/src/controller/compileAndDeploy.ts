import { NextFunction, Request, Response } from "express";
import { compileContract, deployService } from "../service/contractManager";

const compileAndDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filePath = req.file.path;
    const { privateKey } = req?.body;
    const { abi, bytecode } = await compileContract(filePath);
    const { address } = await deployService(abi, bytecode, privateKey);
    res
      .status(200)
      .json({ message: "Contract deployed successfully", address });
  } catch (error) {
    next(error);
  }
};

export default compileAndDeploy;
