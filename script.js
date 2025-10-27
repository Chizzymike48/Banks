
const customersAccount = [
  {accountId: 225, accountHolder: "Osondu Godswil", balance: 500000, type: "Savings"},
  {accountId: 230, accountHolder: "Olatunde Valentine", balance: 2700000, type: "Checkings"},
  {accountId: 235, accountHolder: "Ugwu Malachy", balance: 600000, type: "Checkings"},
  {accountId: 240, accountHolder: "Paul Peculiar", balance: 180000, type: "Savings"}
];

const bankName = "Zenith Bank";

function checkBalance(accountId) {
  const account = customersAccount.find(acc => acc.accountId === accountId);
  if (account) {
    console.log(`${account.accountHolder}'s current balance is $${account.balance}`);
  } else {
    console.log("Account not found");
  }
}

function deposit(accountId, amount) {
  const account = customersAccount.find(acc => acc.accountId === accountId);
  if (account && amount > 0) {
    account.balance += amount;
    console.log(`Deposit successful! Your account has been credited with $${amount}. $${amount} has been added to ${account.accountHolder}'s account at ${bankName}.`);
  } else {
    console.log("Invalid deposit");
  }
}

function withdraw(accountId, amount) {
  const account = customersAccount.find(acc => acc.accountId === accountId);
  const feeRate = 0.03;
  if (account && amount > 0) {
    const fee = amount * feeRate;
    const totalFee = amount + fee
    if (account.balance >= totalFee) {
       account.balance -= totalFee;
      console.log(`Withdrawal of $${amount} successful! Fee: $${fee.toFixed(2)}.`);
    } else {
      console.log("Insufficient funds for this withdrawal.");
    }
  } else {
    console.log("Invalid withdrawal");
  }
}
checkBalance(230);
deposit(230, 500);
withdraw(230, 200);
checkBalance(230);

checkBalance(255);
deposit(255, 1000);
withdraw(255,500);
checkBalance(255);

checkBalance(235);
deposit(235, 2000);
withdraw(235,300);
checkBalance(235);

checkBalance(240);
deposit(240, 2000);
withdraw(240,300);
checkBalance(240);

console.log(bankName)
try{
  console.log(feeRate);
}catch(error){
  console.log("error: it can not be assessed.");
}

