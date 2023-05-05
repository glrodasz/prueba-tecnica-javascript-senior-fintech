// Una transaction es duplicada, si tiene el mismo sourceAccount, targetAccount, category, amount y el tiempo es menor a 1 minuto de diferencia.

// Hacer una funcionalidad que agrupe las transaccciones duplicadas
// en una lista.

// Ejemplo:

const exampleOutput = [
  [
    {
      id: 1,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:33:00.000Z",
    },
    {
      id: 2,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:33:50.000Z",
    },
    {
      id: 3,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:34:30.000Z",
    },
  ],
  [
    {
      id: 5,
      sourceAccount: "A",
      targetAccount: "C",
      amount: 250,
      category: "other",
      time: "2018-03-02T10:33:00.000Z",
    },
    {
      id: 6,
      sourceAccount: "A",
      targetAccount: "C",
      amount: 250,
      category: "other",
      time: "2018-03-02T10:33:05.000Z",
    },
  ],
];

const transactions = [
  {
    id: 3,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:34:30.000Z",
  },
  {
    id: 1,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:00.000Z",
  },
  {
    id: 6,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:05.000Z",
  },
  {
    id: 4,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:36:00.000Z",
  },
  {
    id: 2,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:50.000Z",
  },
  {
    id: 5,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:00.000Z",
  },
];

const sortTransactions = (left, right) => {
  const sourceOrder = left.sourceAccount.localeCompare(right.sourceAccount)
  const targetOrder = left.targetAccount.localeCompare(right.targetAccount)
  const categoryOrder = left.category.localeCompare(right.category)
  const amountOrder = left.amount - right.amount
  const dateOrder = new Date(left.time) - new Date(right.time)

  return sourceOrder || targetOrder || categoryOrder || amountOrder || dateOrder
}

const isSameType = (left, right) => {
  return (
       left.sourceAccount === right.sourceAccount
    && left.targetAccount === right.targetAccount
    && left.amount === right.amount
    && left.category === right.category
  )
}

const calcTimeDifference = (left, right) => {
  const diff = Math.abs(new Date(left) - new Date(right));

  const MS_TO_SEC = 1000
  const SEC_TO_MIN = 60
  const minutes = Math.floor(diff/MS_TO_SEC/SEC_TO_MIN);

  const TIME_GAP_IN_MIN = 1
  return minutes < TIME_GAP_IN_MIN
}

const detectDuplicated = (transaction, index, list) => {
  let duplicated = false

  const current = transaction

  switch (index) {
    case 0: // start (only with next)
      {
        const next = list[index + 1]
        if (isSameType(current, next)) {
          duplicated = calcTimeDifference(current.time, next.time)
        }
      }
      break;
    case (list.length - 1): // end (only with previous)
      {
        const prev = list[index - 1]
        if (isSameType(prev, current)) {
          duplicated = calcTimeDifference(prev.time, current.time)
        }
      }
      break;
    default: // middle (prev and next)
      {
        const prev = list[index - 1]
        if (isSameType(prev, current)) {
          duplicated = calcTimeDifference(prev.time, current.time)
        }
        if (duplicated) { break }
        const next = list[index + 1]
        if (isSameType(current, next)) {
          duplicated = calcTimeDifference(current.time, next.time)
        }
      }
      break;
  }

  return duplicated ? transaction : null
}

const removeNonDuplicated = (transaction) => {
  return Boolean(transaction)
}

const duplicatedTransactions = (transactionsList) => {
  if (!Array.isArray(transactionsList)) {
    throw new Error('require a transaction list')
  }

  return [...transactionsList]
    .sort(sortTransactions)
    .map(detectDuplicated)
    .filter(removeNonDuplicated)
}

const groupTransactionsBy = (duplicatedList) => {
  if (!Array.isArray(duplicatedList)) {
    throw new Error('require a transaction list')
  }

  if (duplicatedList.length === 0) {
    return duplicatedList
  }

  const groupsList = [
    [
      duplicatedList[0]
    ]
  ]
  let groupIndex = 0

  for (let i = 1; i < duplicatedList.length; i++) {
    const prev = duplicatedList[i - 1];
    const current = duplicatedList[i];

    if (!isSameType(prev, current)) {
      ++groupIndex
      groupsList.push([])
    }
    groupsList[groupIndex].push(current)
  }

  return groupsList
}

const duplicatedDetector = (transactionsList) => {
  const duplicated = duplicatedTransactions(transactionsList)
  const result = groupTransactionsBy(duplicated)
  return result
}

const assertionTest = (resultList, expectedList) => {
  const result = resultList.toString()
  const expected = expectedList.toString()
  console.assert(result === expected, '%o', {resultList, expectedList, errorMsg: 'is different than expected'})
}

const result = duplicatedDetector(transactions)
console.log(result)
assertionTest(result, exampleOutput)