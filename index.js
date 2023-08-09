"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
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
    var totalCashIn = calculateTotalCashIn(cashFlow);
    var totalCashOut = calculateTotalCashOut(cashFlow);
    return totalCashIn - totalCashOut;
}
// Route to get cash flow data
app.get("/cashflow", function (req, res) {
    res.json(cashFlow);
});
// Route to add a new transaction
app.post("/transaction", function (req, res) {
    var _a = req.body, amount = _a.amount, type = _a.type;
    if (isNaN(amount)) {
        return res.status(400).json({ error: "Amount must be a valid number" });
    }
    cashFlow[type].push({ amount: parseFloat(amount), type: type });
    res.status(201).json({ message: "Transaction added successfully" });
});
// Route to get cash flow summary
app.get("/summary", function (req, res) {
    var totalCashIn = calculateTotalCashIn(cashFlow);
    var totalCashOut = calculateTotalCashOut(cashFlow);
    var totalAmount = calculateTotalAmount(cashFlow);
    res.json({
        totalCashIn: totalCashIn,
        totalCashOut: totalCashOut,
        totalAmount: totalAmount,
    });
});
// Start the server
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
