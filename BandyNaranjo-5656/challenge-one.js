// Crear una funcionalidad que dado un lista de transacciones, una categoria,
// un rango de fechas, devuelva la suma de todas las transacciones de esa categoria.

// 1. Entiendan muy bien el enunciado
// 2. Planear metalmente / rayar un pseudocódigo de como lo solucionarían
// 3. Hagan funcionalidades pequeñas
// 4. Hagan pase las pruebas (unit tests / console.logs)
// 5. Refactoricen (pongan el código más lindo / legible)

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
  const filterByCategory = category => transaction => transaction.category == category;
  
  const filterByTime = function (startTime, endTime) {
    let startDate = new Date(startTime);
    let endDate = new Date(endTime);
    endDate = endDate.setDate(endDate.getDate() +1);
    return function (transaction) {
        let date = new Date(transaction.time);
        return date >= startDate && date < endDate;
    }
  }

  const sumAmount = (accumulator, transaction) => accumulator + transaction.amount;
  
  const getBalanceByCategoryAndRangeDate = (
    transactions,
    category,
    startTime,
    endTime
  ) =>
    Array.isArray(transactions) 
        ? transactions
            .filter(filterByCategory(category))
            .filter(filterByTime(startTime, endTime))
            .reduce(sumAmount, 0) 
        : 0;
        
console.log(
  getBalanceByCategoryAndRangeDate(transactions, "salary", "2019-01-01", "2023-12-31")
);
  //TESTS
  const transactions2 = [
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

let category = "groceries";
let startTime = "2019-05-10";
let endTime = "2019-05-12";
let transactionsFilteredByCategory = Array.isArray(transactions2) ? transactions2.filter(filterByCategory(category)) :  0;
let transactionsFilteredByTime = Array.isArray(transactions2) ? transactions2.filter(filterByTime(startTime, endTime)) : 0;
let balance = Array.isArray(transactions2) ? transactions2.reduce(sumAmount , 0) : 0;
console.log('balance', balance);