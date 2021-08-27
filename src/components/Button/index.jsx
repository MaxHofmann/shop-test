import React from 'react'

function Button({ disabled, name, id, value, onClick, classButton}) {
  return (
    <button className={classButton} disabled={disabled} name={name} id={id} onClick={onClick}>{value}</button>
  )
}

export default Button
