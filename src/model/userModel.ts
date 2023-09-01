// import { db } from "../config";

export interface UserBankAccountAttributes {
    id: string;
    account_holder_name: string;
    account_holder_DOB: string;
    account_type: string;
    initial_balance: number;
    account_number: number;
}