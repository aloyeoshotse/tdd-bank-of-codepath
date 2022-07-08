import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

export default function TransactionDetail({transactions, setTransactions}) {

  const [hasFetched, setHasFetched] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [got, setGot] = useState(false)

  let {transactionId} = useParams();

  // if (!transactionId) {
  //   return (
  //     <div className="transaction-card card">
  //           <div className="card-header">
  //             <h3>Transaction #{transactionId}</h3>
  //             <h1>Not found</h1>
  //           </div>
  //     </div>
  //   )
  // }

  useEffect(() => {

    const fetchTransactionById = async () => {
      setIsLoading(true);
      setHasFetched(false);
  
      axios.get("http://localhost:3001/bank/transactions/" + transactionId)
        .then(res => {
          setTransaction(res.data.transaction)
          // setGot(true);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
          setHasFetched(true)
          // setGot(false);
        })
        .finally(() => {
          setIsLoading(false);
          setHasFetched(true)
        });
    }

    fetchTransactionById();

  }, [transactionId]);


  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId} isLoading={isLoading} hasFetched={hasFetched}/>
    </div>
  )
}

export function TransactionCard({ transaction, transactionId = null, error}) {

  useEffect(() => {
    console.log("transaction =", transaction)
    console.log("id =", transactionId)
  }, [])


     return (
      <div> 
        { transaction ?

          <div className="transaction-card card">
            <div className="card-header">
              <h3>Transaction #{transactionId}</h3>
              <p className="category">{transaction.category}</p>
            </div>

            <div className="card-content">
              <p className="description">{transaction.description}</p>
            </div>

            <div className="card-footer">
              <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
              <p className="date">{formatDate(transaction.postedAt)}</p>
            </div>
          </div>

            :
            <div className="transaction-card card">
              <div className="card-header">
                <h3>Transaction #{transactionId} </h3>
                <div></div>
                <h1 className="notfound"> Not found</h1>
              </div>
            </div>
          
        }
      </div>
    )
    }
