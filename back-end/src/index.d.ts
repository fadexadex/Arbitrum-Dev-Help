import { Request } from "express";

export interface RequestWithFile extends Request {
  fileValidationError?: string;
}
export interface IAbi {
  inputs: { name: string; type: string }[];
  name: string;
  outputs: { name: string; type: string }[];
  stateMutability: string;
  type: string;
}
