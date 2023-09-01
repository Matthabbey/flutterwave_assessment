import express from "express";
import { createBankAccount, fetchAllBankAccounts, fetchSingleBankAccount } from "../controller/userController";

const router = express.Router();

router.post('/account/create', createBankAccount);
router.get('/account/:account_number', fetchSingleBankAccount);
router.get('/accounts', fetchAllBankAccounts);

export default router;