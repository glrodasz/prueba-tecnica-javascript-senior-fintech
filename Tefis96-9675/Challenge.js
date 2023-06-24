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
        id: 130,
        sourceAccount: "my_work",
        targetAccount: "my_account",
        amount: 1250,
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
    {
        id: 131,
        sourceAccount: "my_work",
        targetAccount: "supermarket",
        amount: 1200,
        category: "salary",
        time: "2019-02-12T12:34:00Z",
    }
];
//CHALLENGE-ONE

// Total amount for transactions
let totalAmountTransactions=0;
transactions.forEach(elm => {
    totalAmountTransactions += elm.amount;
});
console.log(`El monto total de transacciones realizadas es de $${totalAmountTransactions}`)

// Amount for category
let category= 'salary';
const amountForCategory= transactions
    .filter(trans => trans.category === category)
    .reduce((sum,trans) => sum +trans.amount,0)
console.log(`El monto total de transacciones realizadas en la categoria de ${category} es de $${amountForCategory}`);

//Transactions grouped by target
const targetsTransactions= transactions
    .reduce((trans, targ) =>{
        (targ.targetAccount in trans)? trans[targ.targetAccount].push(targ): trans[targ.targetAccount]=[targ];
        return trans
    },{})
console.log(targetsTransactions)

//Total amount for range date
const amountForDate = ( transactions, initialDate, finishDate, category ) =>{
    //Casteo de fecha a ms
    const dateStarted = Date.parse(initialDate);
    const dateFinished = Date.parse(finishDate);
    const  amountForDateAndCategory = transactions
        .filter(trans => trans.category === category) //transcciones por categoria
        .filter(trans=> Date.parse(trans.time) >= dateStarted && Date.parse(trans.time) <= dateFinished)//transcciones dentro del rango de fechas
        .reduce((totalAmount, amount) => totalAmount + amount.amount,0) //Suma de los montos
    console.log(`El monto total de transacciones realizadas en la categoria de ${category} en el rango de fechas ${initialDate} - ${finishDate} es de $${amountForDateAndCategory}`)
}

amountForDate(transactions, '2019-01-11', '2019-05-12', 'salary');

//CHALLENGE-TWO

//Reapeat Transactions
const sourceTransactions= transactions
    .reduce((trans, source) =>{
        (source.sourceAccount in trans)? trans[source.sourceAccount].push(source): trans[source.sourceAccount]=[source]
        return trans
    },{})

for (const repeatTransactions in sourceTransactions) {
    sourceTransactions[repeatTransactions] = sourceTransactions[repeatTransactions].reduce((transaction, targ) =>{
        (targ.targetAccount in transaction)? transaction[targ.targetAccount].push(targ): transaction[targ.targetAccount]=[targ]
        return transaction
    }, {});
}

console.log(sourceTransactions)