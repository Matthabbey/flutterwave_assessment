"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post('/account/create', userController_1.createBankAccount);
router.get('/account/:account_number', userController_1.fetchSingleBankAccount);
router.get('/accounts', userController_1.fetchAllBankAccounts);
exports.default = router;
