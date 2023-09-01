"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllBankAccounts = exports.fetchSingleBankAccount = exports.createBankAccount = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const utility_1 = require("../utils/utility");
//An instance of bank database, an array of objects
let bankData = [];
const dataFile = path_1.default.join(__dirname, "../database.json");
// read the data from the database.json file and parse it as JSON
async function ReadBankAccounts() {
    try {
        const data = fs_1.default.readFileSync(dataFile, "utf-8");
        bankData = JSON.parse(data);
    }
    catch (error) {
        console.error(`Error reading data file: ${error}`);
    }
}
ReadBankAccounts();
//create a new account profile, if there is no current user with
const createBankAccount = async (req, res, next) => {
    try {
        const { account_holder_name, account_holder_DOB, account_type, initial_balance, } = req.body;
        const uuidUser = (0, uuid_1.v4)();
        const validateResult = utility_1.UserSchema.validate(req.body, utility_1.option);
        if (validateResult.error) {
            res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const generateAccountNumber = (0, utility_1.GenerateAccountNumber)();
        //check if accountNumber already exists
        const findAccountNumber = bankData.find((bankDetail) => bankDetail.account_number === generateAccountNumber);
        if (findAccountNumber) {
            return res.status(400).json({
                error: "User with the given accountNumber already exists",
                statusCode: 400,
            });
        }
        else {
            const newUserAccount = {
                id: uuidUser,
                account_holder_name,
                account_holder_DOB,
                account_type,
                initial_balance,
                account_number: generateAccountNumber,
            };
            bankData.push(newUserAccount);
            // save the new account detail with  data array to the file
            fs_1.default.writeFileSync(dataFile, JSON.stringify(bankData, null, 2));
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
    }
    catch (error) {
        console.log(error);
    }
};
exports.createBankAccount = createBankAccount;
const fetchSingleBankAccount = async (req, res, next) => {
    try {
        const { account_number } = req.params;
        const account = bankData.find((bankData) => bankData.account_number.toString() === account_number);
        if (account) {
            return res.status(200).json({
                message: "Account retrieved successfully",
                bankDetail: account,
            });
        }
        else {
            return res.status(404).json({
                Error: "Account not found!",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchSingleBankAccount = fetchSingleBankAccount;
const fetchAllBankAccounts = async (req, res, next) => {
    try {
        return res.status(200).json({
            message: "All bank accounts detail successfully retrieved",
            bankData,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchAllBankAccounts = fetchAllBankAccounts;
