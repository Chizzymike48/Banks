
const customersAccount = [
  { accountId: 225, accountHolder: "Osondu Godswil", balance: 500000, type: "Savings" },
  { accountId: 230, accountHolder: "Olatunde Valentine", balance: 2700000, type: "Checkings" },
  { accountId: 235, accountHolder: "Ugwu Malachy", balance: 600000, type: "Checkings" },
  { accountId: 240, accountHolder: "Paul Peculiar", balance: 180000, type: "Savings" }
];

const loginSection = document.getElementById('loginSection');
const loginIdInput = document.getElementById('loginId');
const loginBtn = document.getElementById('loginBtn');
const loginMessage = document.getElementById('loginMessage');

const accountPanel = document.getElementById('accountPanel');
const accHolder = document.getElementById('accHolder');
const accType = document.getElementById('accType');
const accBalance = document.getElementById('accBalance');

const depositAmountInput = document.getElementById('depositAmount');
const depositBtn = document.getElementById('depositBtn');
const depositMessage = document.getElementById('depositMessage');

const withdrawAmountInput = document.getElementById('withdrawAmount');
const withdrawBtn = document.getElementById('withdrawBtn');
const withdrawMessage = document.getElementById('withdrawMessage');

const logoutBtn = document.getElementById('logoutBtn');
const panelMessage = document.getElementById('panelMessage');

let activeAccount = null;

function findAccount(accountId) {
  return customersAccount.find(acc => acc.accountId === accountId) || null;
}

function formatCurrency(n){
  return '$' + Number(n).toLocaleString(undefined, {minimumFractionDigits:0, maximumFractionDigits:2});
}

function showAccount(account){
  if(!account) return;
  accHolder.textContent = account.accountHolder;
  accType.textContent = account.type;
  accBalance.textContent = formatCurrency(account.balance);
}

function showPanel(){
  loginSection.classList.add('hidden');
  accountPanel.classList.remove('hidden');
}

function showLogin(){
  accountPanel.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginMessage.textContent = '';
}

loginBtn.addEventListener('click', ()=>{
  const id = parseInt(loginIdInput.value);
  if(Number.isNaN(id)){
    loginMessage.textContent = ' Enter a valid numeric ID.';
    return;
  }
  const account = findAccount(id);
  if(!account){
    loginMessage.textContent = ' Account not found.';
    return;
  }
  activeAccount = account;
  showAccount(activeAccount);
  showPanel();
  // clear inputs/messages
  depositMessage.textContent = '';
  withdrawMessage.textContent = '';
  panelMessage.textContent = `Welcome, ${activeAccount.accountHolder.split(' ')[0]}!`;
});

// Deposit
depositBtn.addEventListener('click', ()=>{
  if(!activeAccount){ depositMessage.textContent = ' No active account.'; return; }
  const amount = parseFloat(depositAmountInput.value);
  if(Number.isNaN(amount) || amount <= 0){ depositMessage.textContent = 'Enter a valid amount.'; return; }
  activeAccount.balance += amount;
  showAccount(activeAccount);
  depositMessage.textContent = `✅ ${formatCurrency(amount)} deposited.`;
  depositAmountInput.value = '';
});

// Withdraw
withdrawBtn.addEventListener('click', ()=>{
  if(!activeAccount){ withdrawMessage.textContent = '⚠️ No active account.'; return; }
  const amount = parseFloat(withdrawAmountInput.value);
  if(Number.isNaN(amount) || amount <= 0){ withdrawMessage.textContent = '⚠️ Enter a valid amount.'; return; }
  if(activeAccount.balance >= amount){
    activeAccount.balance -= amount;
    showAccount(activeAccount);
    withdrawMessage.textContent = `✅ ${formatCurrency(amount)} withdrawn.`;
    withdrawAmountInput.value = '';
  } else {
    withdrawMessage.textContent = ' Insufficient funds.';
  }
});

// Logout -> return to ID entry but keep app state in memory
logoutBtn.addEventListener('click', ()=>{
  activeAccount = null;
  loginIdInput.value = '';
  depositAmountInput.value = '';
  withdrawAmountInput.value = '';
  panelMessage.textContent = '';
  showLogin();
});

// keyboard: press Enter in ID input to submit
loginIdInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') loginBtn.click();
});

