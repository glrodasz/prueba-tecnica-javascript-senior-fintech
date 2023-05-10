
/**
 * En base a una lista de transacciones, mostrara aquellas que esten duplicadas y que la diferencia en tiempo
 *  sea menor o igual a 1 minuto
 *
 * [
 *  [{},{},{},{]
 *  [{},{,{},{},{}],
 * ]
 */
 
const transactions = [
    {    id: 1,    sourceAccount: "A",    targetAccount: "B",    amount: 100,    category: "eating_out",    time: "2018-03-02T10:33:00.000Z",},
    {    id: 2,    sourceAccount: "A",    targetAccount: "B",    amount: 100,    category: "eating_out",    time: "2018-03-02T10:33:50.000Z",},
    {    id: 3,    sourceAccount: "A",    targetAccount: "B",    amount: 100,    category: "eating_out",    time: "2018-03-02T10:34:30.000Z",},
    {    id: 4,    sourceAccount: "A",    targetAccount: "B",    amount: 100,    category: "eating_out",    time: "2018-03-02T10:36:00.000Z",},
    
    {    id: 5,    sourceAccount: "A",    targetAccount: "C",    amount: 250,    category: "other",    time: "2018-03-02T10:33:00.000Z",},
    {    id: 6,    sourceAccount: "A",    targetAccount: "C",    amount: 250,    category: "other",    time: "2018-03-02T10:33:05.000Z",},
  ];
  
  const ONE_MINUTE_IN_MS = 1 * 60 * 1000
  
  /**
   * Calcula la diferencia en tiempo entre dos transacciones y determina si es menor o igual a 1 minuto
   * 
   * @param {Object} a 
   * @param {Object} b 
   * @returns boolean
   */

  const IS_TIME_DIFFERENCE_LESS_THAN_ONE_MINUTE = (a,b) => {
    const A_IN_MS= new Date(a.time).getTime()
    const B_IN_MS= new Date(b.time).getTime()
    
    //console.log(`${a.id} => ${A_IN_MS} - ${b.id} => ${B_IN_MS} = ${Math.abs(A_IN_MS - B_IN_MS)}`);
    
    return Math.abs(A_IN_MS - B_IN_MS) < ONE_MINUTE_IN_MS  
  }
  
  /**
   * Ordenamos la lista de transacciones en base a su lista de atributos  y tiempo en orden ascendente
   * De esta forma se facilita despues la comparacion y agrupacion de transacciones duplicadas
   * 
   * @param {Array} transactions
   * @returns {Array}
   */
  const sort_transactions = (transactions) => {
    return transactions.sort(
      (a,b) => (
        a.targetAccount - b.targetAccount
        || a.sourceAccount - b.sourceAccount 
        || a.amount - b.amount
        || a.category - b.category 
        || a.time.localeCompare(b.time )
      )
    )
  }
    
  /**
   * Verificamos si la transaccion esta repetida y es menor a 1 minuto,
   * 
   * @param {Object} transaction 
   * @returns  {Array} Objects 
   */
  const filterByTransaction = (transaction) => {
      
    lista_repetidos = []
    
    for(item of transactions) {
        if(
          transaction.sourceAccount == item.sourceAccount 
          && transaction.targetAccount == item.targetAccount 
          && transaction.amount == item.amount 
          && transaction.category == item.category
          && IS_TIME_DIFFERENCE_LESS_THAN_ONE_MINUTE(transaction, item)
          && transaction.id != item.id
        )   {
          lista_repetidos.push(item)      
        }
    }
    
    // Agregamos la transaction que comparamos, solo si se encontraron transactiones coincidentes

    if(lista_repetidos.length > 0 ){
      lista_repetidos = [transaction, ...lista_repetidos]
    }

    return lista_repetidos  
  }

  /**
   * Verifica que la transaccion actual no este en el grupo de repetidos previamente encontrados,
   * para asi recorrer ese grupo y pasar a la siguiente transaccion a comparar
   * 
   * @param {*} data 
   * @param {*} transaction 
   * @returns 
   */
  const isInArray = (data, transaction) => {
    for(item of data){
      if(item.id === transaction.id) {
        return true
      }
    }
  
    return false
  }
  
  /**
   * Funcion principal para procesar una lista de transacciones
   * 
   * @param {Array} transactions 
   * @returns {Array} transactions (Un array de arrays de objetos o transacciones repetidas)
   */
  const main =(transactions) => {

    let lista_final= []
    idAnterior = 0
    repetidos =[]

    sorted_transactions = sort_transactions(transactions)

    for (transaction of sorted_transactions) {
    
      if(!isInArray(repetidos, transaction)) {

        repetidos = filterByTransaction(transaction)
        
        if(repetidos.length > 0) {
          lista_final.push(repetidos)            
        }
        
      }      
    }

    return lista_final
  }
  
  // Mostramos la lista de transacciones repetidas (agrupadas en sublistas)

  console.log(main(transactions))  
