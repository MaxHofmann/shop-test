import React from 'react';

function Textarea(props) {
  return (
    <textarea
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
}

export default Textarea;
