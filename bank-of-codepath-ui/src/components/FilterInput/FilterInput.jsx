import * as React from "react"
import "./FilterInput.css"

export default function FilterInput({inputValue, handleOnChange}) {
  console.log(inputValue)
  return (
    <div className="filter-input">
      <i className="material-icons">search</i>
      <input type="text" placeholder="Search transactions" onChange={handleOnChange} value={inputValue}/>
    </div>
  )
}
