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


const returnDuplicates = function(transactionToCompare){
  return function(transaction){
    const ONE_MINUTE_IN_MS = 60*1000;
    const time1 = new Date(transactionToCompare.time).getTime();
    const time2 = new Date(transaction.time).getTime();
    const isDuplicate = transaction.sourceAccount == transactionToCompare.sourceAccount &&
    transaction.targetAccount == transactionToCompare.targetAccount && transaction.amount == transactionToCompare.amount && 
    transaction.category == transactionToCompare.category && transaction.id != transactionToCompare.id && (Math.abs(time1 - time2)  <=  ONE_MINUTE_IN_MS)
    if (isDuplicate){
      return transaction.id;
    }
  }
      
}

const findDuplicates = function(arrayWithTransactions){
  let duplicatedObjects = [];
  const duplicates = new Map();
  const finalduplicatedObjects = [];

  transactions.forEach(transactionToCompare => {
    let duplicatedObject;
    duplicatedObject = transactions.filter(returnDuplicates(transactionToCompare));
    duplicatedObject ? duplicatedObjects.push(...duplicatedObject) : false
  });

  duplicatedObjects.forEach(duplicatedObject => {
    duplicates.set(duplicatedObject.id, duplicatedObject);
  });
  finalduplicatedObjects.push(...duplicates.values());
  console.log(finalduplicatedObjects);
}

findDuplicates(transactions);

