import React from "react";

export default function Filter({fileterdList, handleChange}) {

  return (
    <input type="text" value={fileterdList} onChange={handleChange}></input>
  )
}
