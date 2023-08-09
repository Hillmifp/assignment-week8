"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(body_parser_1.default.json());
var cashFlow = {
    cashIn: [],
    cashOut: [],
};
// Function to calculate Cash In
function calculateTotalCashIn(cashFlow) {
    return cashFlow.cashIn.reduce(function (total, transaction) {
        return total + transaction.amount;
    }, 0);
}
// Function to calculate Cash Out
function calculateTotalCashOut(cashFlow) {
    return cashFlow.cashOut.reduce(function (total, transaction) {
        return total + transaction.amount;
    }, 0);
}
// Function to calculate total amount (Cash In - Cash Out)
function calculateTotalAmount(cashFlow) {
    const totalCashIn = calculateTotalCashIn(cashFlow);
    const totalCashOut = calculateTotalCashOut(cashFlow);
    return totalCashIn - totalCashOut;
}
// Route to get cash flow data
app.get("/cashflow", (req, res) => {
    res.json(cashFlow);
});
// Route to add a new transaction
app.post("/transaction", (req, res) => {
    const { amount, type } = req.body;
    if (isNaN(amount)) {
        return res.status(400).json({ error: "Amount must be a valid number" });
    }
    cashFlow[type].push({ amount: parseFloat(amount), type });
    res.status(201).json({ message: "Transaction added successfully" });
});
// Route to get cash flow summary
app.get("/summary", (req, res) => {
    const totalCashIn = calculateTotalCashIn(cashFlow);
    const totalCashOut = calculateTotalCashOut(cashFlow);
    const totalAmount = calculateTotalAmount(cashFlow);
    res.json({
        totalCashIn: totalCashIn,
        totalCashOut: totalCashOut,
        totalAmount: totalAmount,
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
