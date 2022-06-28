import * as React from "react"
import { useEffect } from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios"

export default function Home({transactions, setTransactions, transfers, setTransfers, error,
                                setError, isLoading, setIsLoading, filterInputValue}) {
  
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

  useEffect(() => {
    setIsLoading(true)
    getTransactionData();
    getTransferData();
    console.log("transaction: ",transactions)
    console.log("transfer: ", transfers)
    setIsLoading(false)
  }, [])

  
 var filteredTransactions = transactions
  if (filterInputValue != undefined){
    if (filterInputValue.length != 0) {
      filteredTransactions.filter((item) => {item.description.toLowerCase().includes(filterInputValue)})
    }
  }

  return (
    <div className="home">
      <AddTransaction />
      {isLoading==true ? <h1>"Loading..."</h1> : <BankActivity transactions={filteredTransactions}/>}
      {error == null ? null : <h2>{error}</h2>}
    </div>
  )
}
