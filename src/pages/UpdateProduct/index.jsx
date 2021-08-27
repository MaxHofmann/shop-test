import React from 'react';
import useStore from '../../hooks/store';
import { FormCart, Button } from '../../components';
import { Link } from 'react-router-dom';

function UpdateProduct() {
  const { actions } = useStore();
  return (
    <div className="container">
      <Link to="/">
        <Button classButton={'button'} value={'Назад'} />
      </Link>
      <FormCart func={actions.updateCart} textForm={'Форма редактирования товара'} />
    </div>
  );
}

export default UpdateProduct;
