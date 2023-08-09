type CashTransaction = {
  amount: number;
  type: "cashIn" | "cashOut";
};

type CashFlow = {
  cashIn: CashTransaction[];
  cashOut: CashTransaction[];
};

// Function untuk menghitung Cash In
function calculateTotalCashIn(cashFlow: CashFlow): number {
  return cashFlow.cashIn.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}

// Function untuk menghitung Cash Out
function calculateTotalCashOut(cashFlow: CashFlow): number {
  return cashFlow.cashOut.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}

// Function untuk update DOM dari Result
function updateResults() {
  const cashInResultElement = document.getElementById("cashInResult");
  const cashOutResultElement = document.getElementById("cashOutResult");

  if (cashInResultElement && cashOutResultElement) {
    cashInResultElement.textContent = `Total cash in: Rp. ${calculateTotalCashIn(
      cashFlow
    )}`;
    cashOutResultElement.textContent = `Total cash out: Rp. ${calculateTotalCashOut(
      cashFlow
    )}`;
  }
}

//Contoh dari cash flow
const cashFlow: CashFlow = {
  cashIn: [],
  cashOut: [],
};

const cashFlowForm = document.getElementById("cashFlowForm");

if (cashFlowForm) {
  cashFlowForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const typeSelect = document.getElementById("type") as HTMLInputElement;

    if (amountInput && typeSelect) {
      const amount = parseFloat(amountInput.value);
      const type = typeSelect.value as "cashIn" | "cashOut";

      if (!isNaN(amount)) {
        cashFlow[type].push({ amount, type });
        updateResults();
      }

      // Reset form setelah pengisian data
      cashFlowForm.reset();
    }
  });
}

updateResults();

// Function untuk menghitung total amount (Cash In - Cash Out)
function calculateTotalAmount(cashFlow: CashFlow): number {
  const totalCashIn = calculateTotalCashIn(cashFlow);
  const totalCashOut = calculateTotalCashOut(cashFlow);
  return totalCashIn - totalCashOut;
}

// Fcuntion untuk update DOM dengan result akhir/total

function updateResults() {
  const cashInResultElement = document.getElementById("cashInResult");
  const cashOutResultElement = document.getElementById("cashOutResult");
  const totalAmountResultElement = document.getElementById("totalAmountResult");

  if (cashInResultElement && cashOutResultElement && totalAmountResultElement) {
    cashInResultElement.textContent = `Rp. ${calculateTotalCashIn(cashFlow)}`;
    cashOutResultElement.textContent = `Rp. ${calculateTotalCashOut(cashFlow)}`;
    totalAmountResultElement.textContent = `Rp. ${calculateTotalAmount(
      cashFlow
    )}`;
  }
}
