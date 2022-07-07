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


  // async function handleOnSubmitNewTransaction (event) {
  //   await setNewTransactionForm(event.target.value)
  // }

 const handleOnCreateTransaction = async () => {
    setIsCreating(true);
    axios.post("http://localhost:3001/bank/transactions", {transaction: newTransactionForm})
      .then((res) => { 
        setTransactions((transactions) => [...transactions,res.data.transaction]);
      })
      .catch((err) => {
        setError(err);
        setIsCreating(false)
      })
      .finally(() => {
        setIsCreating(false);
        setNewTransactionForm({description:"", category:"", amount:0})
      })
  }

  // useEffect(() => {
  //   console.log("new data = ", transactions);
  // }, [transactions])

  // useEffect(() => {
  //   console.log("form = ", newTransactionForm);
  // }, [newTransactionForm])


  {
    return(
      isLoading == true ? 
        <div className="home">
          <AddTransaction form={newTransactionForm} setForm={setNewTransactionForm} isCreating={isCreating} 
                            setIsCreating={setIsCreating} handleOnSubmit={handleOnCreateTransaction}/>
          <h1>Loading...</h1> 
        </div>
      :
        <div className="home">
          <AddTransaction form={newTransactionForm} setForm={setNewTransactionForm} isCreating={isCreating} 
                            setIsCreating={setIsCreating} handleOnSubmit={handleOnCreateTransaction}/>
          <BankActivity transactions={filteredTransactions} transfers={transfers}/>
          {error == null ? null : <h2>{error}</h2>}
        </div>
    )

  }
}
