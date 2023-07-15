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



const sortedByDate = (a, b) => new Date(a.time) - new Date(b.time);



const tokenAssign = ({ sourceAccount, targetAccount, amount, category }) => {
    return `${sourceAccount}${targetAccount}${category}${amount}`;

}



const goupedByToken = (acc, curr) => {
    const token = tokenAssign(curr);

    acc[token] = acc[token] || [];
    acc[token].push(curr);

    return acc;

}

const groupingBySimilarTime = (acc, element) => {
    const { time } = element;
    const TIME_DIFF = 60 * 1000;


    if (acc.length == 0) {
        acc.push([element])

    //buscar como mejorar esta parte del codigo para hacerla mas entendible    
    } else if (new Date(time) - new Date(acc[acc.length - 1][acc[acc.length - 1].length - 1].time) <= TIME_DIFF) {
      
        acc[acc.length - 1].push(element);

    } else {
        acc.push([element]);
    }

       
    // console.log(acc);



    return acc;
}

//aca aplico reduce a cada grupo para que se compruebe si cumplen con el requisito de tiempo para considerarse duplicadas

const mappingByGroup = (group) => {
    
    return group.reduce(groupingBySimilarTime, []);
}

//se ordenan las transacciones por fecha de mas antigua a mas reciente
const arraySortedByDate = transactions.sort(sortedByDate);

// se agrupan en un objeto por un token creado por transaccion
const groupWithToken = arraySortedByDate.reduce(goupedByToken, {});

// De cada grupo generado en el objeto se extraen los valores agrupados en un array

const groupedByTokenInArray = Object.values(groupWithToken)

//se le aplica la funcionalidad para comparar si el tiempo entre trasaccion es menor a 1 minuto y de esta manera agruparlas en transacciones duplicadas

const groupWithTokenMapped = groupedByTokenInArray.map(mappingByGroup);


console.info(groupWithTokenMapped.flat());


//FALTA ELIMINAR LOS GRUPOS CON LAS TRANSACCIONES QUE NO RESULTARON SER DUPLICADAS