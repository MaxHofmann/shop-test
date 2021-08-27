import React, { useEffect } from 'react';
import useStore from '../../hooks/store';
import { Button } from '../../components';
import { Link } from 'react-router-dom';
import { format, isBefore, differenceInBusinessDays } from 'date-fns';
const date = new Date()
const dateFormatted = format(date, "yyyy-MM-dd")

function Home() {
  const { state, actions } = useStore();

  useEffect(() => {
    actions.getCollection();
  }, [actions]);

  function handleClick(e) {
    e.preventDefault();
    actions.deleteTodo({
      idCart: e.target.id,
      urlImage: e.target.name,
    });
    actions.getCollection();
    actions.getCollection();
  }

  function handleClickUpdate(e) {
    actions.setId(e.target.id);
  }

  return (
    <div className="container">
      <Link to="add">
        <Button classButton={"button"} value={'add product'} />
      </Link>

      <div className="content__top">
        {state.items &&
          state.items.map((item) => (
            <ul className="shoes-block" key={item.id}>
              <li className="shoes-block__item">
                <img className="shoes-block__image" src={item.imageUrl} alt="shoes" />
              </li>
              <li className="shoes-block__item">
                <h2>{item.name}</h2>
              </li>
              <li className="shoes-block__item description">{item.description}</li>
              <li className="shoes-block__item">{`${(!item.aDiscount && item.price || !isBefore(new Date(dateFormatted), new Date(item.endOfDiscount)) && item.price)
                ||
                Math.round(item.price - (item.price * item.aDiscount) / 100)}
                ${isBefore(new Date(dateFormatted), new Date(item.endOfDiscount)) && '  - (Скидка  '+ item.aDiscount + '%)'|| '' }
                `}</li>
              <li className="shoes-block__item">{`${isBefore(new Date(dateFormatted), new Date(item.endOfDiscount))&& item.aDiscount && differenceInBusinessDays(new Date(item.endOfDiscount), new Date(dateFormatted)) + ' дней, до конца скидки'||'' }`}</li>
              <li className="shoes-block__item">
                <Button classButton={"button button-cart"} name={item.imageUrl} id={item.id} onClick={handleClick} value={'delete'} />
                <Link to="update">
                  <Button classButton={"button button-cart"} id={item.id} onClick={handleClickUpdate} value={'update'} />
                </Link>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
}

export default Home;
