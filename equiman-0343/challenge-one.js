// Crear una funcionalidad que dado un lista de transacciones, una categoría,
// un rango de fechas, devuelva la suma de todas las transacciones de esa categoría.

const testTransactions = [
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
    id: 128,
    sourceAccount: "my_account",
    targetAccount: "supermarket",
    amount: -10,
    category: "groceries",
    time: "2019-01-23T12:51:00Z",
  },
]

// category: eating_out
// sum: -80

// category: groceries
// sum: -10

// category: eating_out, groceries
// sum: -90

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

const filterByCategory = (categoryList) => {
  return (transaction) => categoryList.includes(transaction.category)
}

const filterByDate = (startDate, endDate) => {
  const start = new Date(`${startDate}T00:00:00Z`)
  const end = new Date(`${endDate}T23:59:59Z`)

  return (transaction) => {
    if (!transaction?.time) {
      return false
    }

    const check = new Date(transaction.time)
    return (start <= check && check <= end)
  }
}

const sumTransactions = (totalBalance, transaction) => {
  return (totalBalance + transaction?.amount) ?? 0
}

const transactionsFilter = (transactionsList, categoryList, startDate, endDate) => {
  if (!Array.isArray(testTransactions)) {
    throw new Error('transaction list was expected')
  }

  if (!Array.isArray(categoryList)) {
    throw new Error('category list was expected')
  }

  const result = transactionsList
    .filter(filterByCategory(categoryList))
    .filter(filterByDate(startDate, endDate))
    .reduce(sumTransactions, 0)
  return result
}

const result = transactionsFilter(
  transactions,
  ['eating_out', 'groceries', 'salary'],
  '2018-03-12',
  '2019-12-12')

console.log(result)


