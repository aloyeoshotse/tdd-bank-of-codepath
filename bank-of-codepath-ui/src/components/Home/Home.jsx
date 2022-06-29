import * as React from "react"
import { useEffect } from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios"

export default function Home({transactions, setTransactions, transfers, setTransfers, error,
                                setError, isLoading, setIsLoading, filterInputValue,
                                newTransactionForm, setNewTransactionForm, isCreating,
                                setIsCreating}) {
  
  function getTransactionData() {
    axios.get("http://localhost:3001/bank/transactions")
    .then((res) => {
      setTransactions(res.data.transactions)
    })
    .catch(error => {
      setError(error)
    })
  }              
  
  const getTransferData = async () => {
    const url = "http://localhost:3001/bank/transfers"
    try{
      let response = await axios.get(url)
      setTransfers(response.data.transfers)
    }
    catch(e) {
      console.log(e)
      setError(e)
    }
  }

  useEffect(async () => {
    await setIsLoading(true)
    await getTransactionData();
    await getTransferData();
    await setIsLoading(false)
  }, [])


  var filteredTransactions = [];
  if (transactions){
    filteredTransactions = transactions;
    if (filterInputValue != ""){
      filteredTransactions = transactions.filter((item) => {
        return item.description.toLowerCase().includes(filterInputValue.toLowerCase());
      })
    }
  }



  const handleOnSubmitNewTransaction = (event) => {
    setNewTransactionForm(event.target.value)
  }

  async function handleOnCreateTransaction() {
    setIsCreating(true);
    axios.post("http://localhost:3001/bank/transactions", newTransactionForm)
      .then((res) => { 
        transactions = transactions.concat(res.data.transactions)
        setTransactions(transactions);
        setNewTransactionForm({category:"", description:"", amount:0})
        setIsCreating(false);
      })
      .catch((err) => {
        setError(err);
        setIsCreating(false)
      })
  }

  // useEffect(() => {
  //   console.log("transactions_new= ", transactions)
  // }, [])

  // return (
    // <div className="home">
    //   <AddTransaction isCreating={isCreating} setIsCreating={setIsCreating} 
    //                   form={newTransactionForm} setForm={setNewTransactionForm} handleOnSubmit={handleOnSubmitNewTransaction}/>
    //   {isLoading==true ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions} transfers={transfers}/>}
    //   {error == null ? null : <h2>{error}</h2>}
    // </div>
  // )

  {
    return(
      isLoading == true ? 
        <div className="home">
          <AddTransaction form={newTransactionForm} isCreating={isCreating} setIsCreating={setIsCreating} />
          <h1>Loading...</h1> 
        </div>
      :
        <div className="home">
          <AddTransaction form={newTransactionForm} isCreating={isCreating} setIsCreating={setIsCreating} />
          <BankActivity transactions={filteredTransactions} transfers={transfers}/>
          {error == null ? null : <h2>{error}</h2>}
        </div>
    )

  }
}
