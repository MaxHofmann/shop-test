import React from 'react';

function Input(props) {
  return (
    <input
      
      onChange={e => props.onChange(e.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default Input;

