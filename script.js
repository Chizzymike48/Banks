const customersAccount = [
  { accountId: 225, accountHolder: "Osondu Godswil", balance: 500000, type: "Savings" },
  { accountId: 230, accountHolder: "Olatunde Valentine", balance: 2700000, type: "Checkings" },
  { accountId: 235, accountHolder: "Ugwu Malachy", balance: 600000, type: "Checkings" },
  { accountId: 240, accountHolder: "Paul Peculiar", balance: 180000, type: "Savings" }
];

const bankName = "Zenith Bank";

// Find Account
function findAccount(accountId) {
  const account = customersAccount.find(acc => acc.accountId === accountId);
  return account || null;
}

// Deposit
function deposit(accountId, amount) {
  const account = findAccount(accountId);
  if (!account) return "❌ Account not found.";
  if (amount <= 0) return "⚠️ Invalid deposit amount.";
  account.balance += amount;
  return `✅ $${amount} deposited successfully into ${account.accountHolder}'s ${account.type} account.`;
}

//  Withdraw
function withdraw(accountId, amount) {
  const account = findAccount(accountId);
  if (!account) return "❌ Account not found.";
  if (amount <= 0) return "⚠️ Invalid withdrawal amount.";
  if (account.balance >= amount) {
    account.balance -= amount;
    return `✅ Withdrawal of $${amount} successful.`;
  } else {
    return "❌ Insufficient funds.";
  }
}

// Check Balance
function checkBalance(accountId) {
  const account = findAccount(accountId);
  return account ? account.balance : null;
}


function showAccountDetails(account) {
  const detailsCard = document.getElementById("accountDetails");
  const accName = document.getElementById("accName");
  const accType = document.getElementById("accType");
  const accBalance = document.getElementById("accBalance");

  if (account) {
    detailsCard.classList.remove("hidden");
    accName.textContent = account.accountHolder;
    accType.textContent = account.type;
    accBalance.textContent = `$${account.balance.toLocaleString()}`;
  } else {
    detailsCard.classList.add("hidden");
  }
}

function checkBalanceUI() {
  const id = parseInt(document.getElementById("checkId").value);
  const account = findAccount(id);
  const result = document.getElementById("balanceResult");

  if (account) {
    showAccountDetails(account);
    result.textContent = "";
  } else {
    document.getElementById("accountDetails").classList.add("hidden");
    result.textContent = "❌ Account not found.";
  }
}

function depositUI() {
  const id = parseInt(document.getElementById("depositId").value);
  const amount = parseFloat(document.getElementById("depositAmount").value);
  const result = document.getElementById("depositResult");

  const message = deposit(id, amount);
  result.textContent = message;

  // Auto-refresh balance if currently viewing that account
  const activeId = parseInt(document.getElementById("checkId").value);
  if (id === activeId) {
    const account = findAccount(id);
    showAccountDetails(account);
  }
}

function withdrawUI() {
  const id = parseInt(document.getElementById("withdrawId").value);
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const result = document.getElementById("withdrawResult");

  const message = withdraw(id, amount);
  result.textContent = message;

  // Auto-refresh balance if currently viewing that account
  const activeId = parseInt(document.getElementById("checkId").value);
  if (id === activeId) {
    const account = findAccount(id);
    showAccountDetails(account);
  }
}
