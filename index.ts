import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Example cash flow data
interface CashFlow {
  cashIn: Transaction[];
  cashOut: Transaction[];
}

interface Transaction {
  amount: number;
  type: string;
}

var cashFlow: CashFlow = {
  cashIn: [],
  cashOut: [],
};

// Function to calculate Cash In
function calculateTotalCashIn(cashFlow: CashFlow): number {
  return cashFlow.cashIn.reduce(function (total, transaction) {
    return total + transaction.amount;
  }, 0);
}

// Function to calculate Cash Out
function calculateTotalCashOut(cashFlow: CashFlow): number {
  return cashFlow.cashOut.reduce(function (total, transaction) {
    return total + transaction.amount;
  }, 0);
}

// Function to calculate total amount (Cash In - Cash Out)
function calculateTotalAmount(cashFlow: CashFlow): number {
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
