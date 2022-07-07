import * as React from "react"
import { useEffect } from "react"
import "./AddTransaction.css"

export default function AddTransaction({form, isCreating, setIsCreating, setForm, handleOnSubmit}) {

  const handleOnFormFieldChange = (change) => {
    if (form){
      let newObj = form
      let property = change.target.name
      let value = change.target.value
      if (property == "amount" && value.length > 0) {value = parseInt(value)}
      let pair = {[property] : value}
      newObj = {...newObj, ...pair}
      setForm(newObj)
    }
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm form={form} isCreating={isCreating} handleOnSubmit={handleOnSubmit} 
                                handleOnFormFieldChange={handleOnFormFieldChange}/>
    </div>
  )
}

export function AddTransactionForm({handleOnSubmit, form, handleOnFormFieldChange}) {

  // useEffect(() => {
    // console.log("form= ",form)
  //   console.log("type of function=", typeof handleOnSubmit)
  // })



  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          { 
            !form ? 
            null : <input name="description" placeholder="Description" type="text" value={form.description} onChange={handleOnFormFieldChange}/>
          }
        </div>
        <div className="field">
          <label>Category</label>
          { 
            !form ? 
            null : <input name="category" placeholder="Category" type="text" value={form.category} onChange={handleOnFormFieldChange}/>
          }
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          { 
            !form ? 
            null : <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleOnFormFieldChange}/>
          }
        </div>

        <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
