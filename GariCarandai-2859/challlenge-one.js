// Crear una funcionalidad que dado un lista de transacciones, una categoria,
// un rango de fechas, devuelva la suma de todas las transacciones de esa categoria.

const transactions = [
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: -30,
    category: "eating_out",
    time: "2018-03-12T12:34:00Z",
  },
  {
    id: 124,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: -50,
    category: "eating_out",
    time: "2018-03-12T11:34:00Z",
  },
  {
    id: 127,
    sourceAccount: "my_account",
    targetAccount: "restaurant",
    amount: -100,
    category: "eating_out",
    time: "2019-03-23T11:51:00Z",
  },
  {
    id: 125,
    sourceAccount: "my_work",
    targetAccount: "my_account",
    amount: 1000,
    category: "salary",
    time: "2019-02-12T12:34:00Z",
  },
  {
    id: 126,
    sourceAccount: "my_work",
    targetAccount: "my_account",
    amount: 1100,
    category: "salary",
    time: "2019-05-12T12:34:00Z",
  },
  {
    id: 129,
    sourceAccount: "my_account",
    targetAccount: "my_work",
    amount: -100,
    category: "salary",
    time: "2019-05-12T12:35:00Z",
  },
  {
    id: 128,
    sourceAccount: "my_account",
    targetAccount: "supermarket",
    amount: -10,
    category: "groceries",
    time: "2019-01-23T12:51:00Z",
  },
];


const filterByCategory = category => transaction => {
  if(transaction.category === category){
    return transaction;
  }
}

const filterByDate = (startDate, endDate) => transaction => {
  const startDateMs = new Date(startDate).getTime();
  const endDateMs = new Date(endDate+"T23:59:59").getTime();
  const transactionTimeMs = new Date(transaction.time).getTime();
  
  if(transactionTimeMs >= startDateMs && transactionTimeMs <= endDateMs){
    return transaction;
  }
  
}

function filterTransactionsAndGetTotalBalance(transactionsList, category, startDate, endDate){
  let totalBalanceTransactions = 0;
  const transactionsFiltered = transactionsList  
  .filter(filterByCategory(category))
  .filter(filterByDate(startDate, endDate))
  .forEach( transaction => totalBalanceTransactions += transaction.amount );
  
  return totalBalanceTransactions;
}

console.log(filterTransactionsAndGetTotalBalance(transactions, "eating_out", "2018-01-01", "2019-01-01"));