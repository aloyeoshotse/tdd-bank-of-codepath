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
    .then(setIsLoading(false))
    .catch(error => {
      setError(error)
    })
  }              
  
  const getTransferData = async () => {
    const url = "http://localhost:3001/bank/transfers"
    try{
      let response = await axios.get(url)
      setTransfers(response.data.transfers)
      await setIsLoading(false)
    }
    catch(e) {
      console.log(e)
      setError(e)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getTransactionData();
    getTransferData();
  }, [])

  
 var filteredTransactions = transactions
  if (filterInputValue != undefined){
    if (filterInputValue != "") {
      filteredTransactions.filter((item) => {item.description.toLowerCase().includes(filterInputValue)})
    }
  }

  const handleOnSubmitNewTransaction = (event) => {
    setNewTransactionForm(event.target.value)
  }

  async function handleOnCreateTransaction() {
    setIsCreating(true);
    // try{
    //   axios.post("http://localhost:3001/bank/transactions", newTransactionForm)
    // }
    // catch (err){
    //   setError(err)
    //   setIsCreating(false)
    // }
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

  return (
    <div className="home">
      <AddTransaction isCreating={isCreating} setIsCreating={setIsCreating} 
                      form={newTransactionForm} setForm={setNewTransactionForm} handleOnSubmit={handleOnSubmitNewTransaction}/>
      {isLoading==true ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions} transfers={transfers}/>}
      {error == null ? null : <h2>{error}</h2>}
    </div>
  )
}
