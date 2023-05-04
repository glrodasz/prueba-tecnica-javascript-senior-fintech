// Una transaction es duplicada, si tiene el mismo sourceAccount, targetAccount, category, amount y el tiempo es menor a 1 minuto de diferencia.
// Hacer una funcionalidad que agrupe las transaccciones duplicadas en una lista.

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



function filterBySourceAccount_TargetAccount_Category_Amount(transactionsList){
  const copyTransactions = new Array(...transactionsList);
  const result = [];

  if(copyTransactions.length != 0){

    while(copyTransactions.length != 0){
      
      const firtsTransactionOfList = copyTransactions[0];
      copyTransactions[0].time = new Date(copyTransactions[0].time).getTime();
      result.push([copyTransactions[0]]);
      copyTransactions.shift();

      if(copyTransactions.length != 0){
        for(let i = 0; i < copyTransactions.length; i++){

          if(firtsTransactionOfList.sourceAccount === copyTransactions[i].sourceAccount
          && firtsTransactionOfList.targetAccount === copyTransactions[i].targetAccount
          && firtsTransactionOfList.amount === copyTransactions[i].amount
          && firtsTransactionOfList.category === copyTransactions[i].category){

            copyTransactions[i].time = new Date(copyTransactions[i].time).getTime();
            result[result.length-1].push(copyTransactions[i]);
            let index = copyTransactions.indexOf(copyTransactions[i]);
            copyTransactions.splice(index, 1);
            i--;
            
          }
        }

      }

      if(copyTransactions.length == 0){
        return result;
        //console.log(outputTransactionsList)
      }

    }

  }  
}

function orderByDate(transactionsList){
  const result = transactionsList;

  for(let i = 0; i < transactionsList.length; i++){
    for(let j = 0; j < transactionsList[i].length-1; j++){
      let firtsTransactionOfList = transactionsList[i][j];
      let secondTransactionOfList = transactionsList[i][j+1];

      if(firtsTransactionOfList.time > secondTransactionOfList.time){
        transactionsList[i][j] = secondTransactionOfList;
        transactionsList[i][j+1] = firtsTransactionOfList;
        j = 0;

      }
    }

  }

  return result;

}

function filterByDate(transactionsList){
  const result = [];
  const MINUTE_IN_MS = 60 * 1000;//60000
  let firtsValidCheck = true;

  for(let i = 0; i < transactionsList.length; i++){
    for(let j = 0; j < transactionsList[i].length-1; j++){
      let diference = transactionsList[i][j+1].time - transactionsList[i][j].time;

      if(diference < MINUTE_IN_MS){
        if(firtsValidCheck){
          const formDateOne = new Date(transactionsList[i][j].time);
          const formDateTwo = new Date(transactionsList[i][j+1].time);
          transactionsList[i][j].time = formDateOne;
          transactionsList[i][j+1].time = formDateTwo;

          result.push(
            [transactionsList[i][j], transactionsList[i][j+1]]
          );

          firtsValidCheck = false;

        }else{
          const formDateTwo = new Date(transactionsList[i][j+1].time);
          transactionsList[i][j+1].time = formDateTwo;

          result[result.length-1].push(
            transactionsList[i][j+1]
          );

        }    

      }else{ firtsValidCheck = true; }

    }
  }

  return result;
  
}


function getDuplicateTransactions(transactionsList){
  return filterByDate(
    orderByDate( 
      filterBySourceAccount_TargetAccount_Category_Amount(transactionsList) ) );
  
}

console.log(getDuplicateTransactions(transactions));
