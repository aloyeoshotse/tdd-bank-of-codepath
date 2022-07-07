import * as React from "react"
import "./FilterInput.css"
import { useEffect } from "react"

export default function FilterInput({inputValue, handleOnChange}) {
  return (
    <div className="filter-input">
      <i className="material-icons">search</i>
      <input type="text" placeholder="Search transactions" onChange={handleOnChange} value={inputValue}/>
    </div>
  )
}
