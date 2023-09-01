import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { UserBankAccountAttributes } from "../model/userModel";
import { GenerateAccountNumber, UserSchema, option } from "../utils/utility";

//An instance of bank database, an array of objects
let bankData: UserBankAccountAttributes[] = [];

const dataFile = path.join(__dirname, "../database.json");

// read the data from the database.json file and parse it as JSON
async function ReadBankAccounts() {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    bankData = JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data file: ${error}`);
  }
}
ReadBankAccounts();

//create a new account profile, if there is no current user with
export const createBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      account_holder_name,
      account_holder_DOB,
      account_type,
      initial_balance,
    } = req.body;
    const uuidUser = uuidv4();

    const validateResult = UserSchema.validate(req.body, option);
    if (validateResult.error) {
      res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const generateAccountNumber = GenerateAccountNumber();

    //check if accountNumber already exists
    const findAccountNumber = bankData.find(
      (bankDetail) => bankDetail.account_number === generateAccountNumber
    );
    if (findAccountNumber) {
      return res.status(400).json({
        error: "User with the given accountNumber already exists",
        statusCode: 400,
      });
    } else {
      const newUserAccount: UserBankAccountAttributes = {
        id: uuidUser,
        account_holder_name,
        account_holder_DOB,
        account_type,
        initial_balance,
        account_number: generateAccountNumber,
      };
      bankData.push(newUserAccount);

      // save the new account detail with  data array to the file
      fs.writeFileSync(dataFile, JSON.stringify(bankData, null, 2));
      let data = {
        name: account_holder_name,
        account_type: account_type,
        balance: initial_balance,
        account_number: newUserAccount.account_number,
      };

      return res.status(201).json({
        message: `Account successfully created for ${account_holder_name}`,
        data,
      });
    }
  } catch (error) {
      console.log(error)
    }
};

export const fetchSingleBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { account_number } = req.params;

    const account = bankData.find(
      (bankData) => bankData.account_number.toString() === account_number
    );

    if (account) {
      return res.status(200).json({
        message: "Account retrieved successfully",
        bankDetail: account,
      });
    } else {
      return res.status(404).json({
        Error: "Account not found!",
      });
    }
  } catch (error) {
   console.log(error)
  }
};

export const fetchAllBankAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      message: "All bank accounts detail successfully retrieved",
      bankData,
    });
  } catch (error) {
   console.log(error)
  }
};
