import React from 'react';
import useStore from '../../hooks/store';
import { FormCart, Button } from '../../components';
import { Link } from 'react-router-dom';

function AddProduct() {
  const { actions } = useStore();
  return (
    <div className="container">
      <Link to="/">
        <Button classButton={'button'} value={'Назад'} />
      </Link>
      <FormCart func={actions.createCart} textForm={'Форма добавления товара'} />
    </div>
  );
}

export default AddProduct;
