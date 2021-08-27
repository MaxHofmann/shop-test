import React, { useState, useEffect } from 'react';
import { Button } from '..';
import { format, isBefore } from 'date-fns'
const date = new Date()
const dateFormatted = format(date, "yyyy-MM-dd")

function FormCart({func, textForm}) {
  const [name, setName] = useState('');
  const [nameDirty, setNameDirty] = useState(false)
  const [nameError, setNameError] = useState('Поле не может быть пустым')

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('')

  const [price, setPrice] = useState('');
  const [priceDirty, setPriceDirty] = useState(false)
  const [priceError, setPriceError] = useState('Поле не может быть пустым')

  const [aDiscount, setADiscount] = useState('');
  const [aDiscountError, setDiscountError] = useState('')

  const [endOfDiscount, setEndOfDiscount] = useState('2018-07-22');
  const [endOfDiscountDirty, setEndOfDiscountDirty] = useState(false)
  const [endOfDiscountError, setEndOfDiscountError] = useState('Поле не может быть пустым')

  const [file, setFile] = useState(null);
  const [fileDirty, setFileDirty] = useState(false)
  const [fileError, setFileError] = useState('Поле не может быть пустым')

  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (nameError || priceError || fileError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, priceError, fileError])

  const fileHandler = (e) => {
    let imgFile =  e.target.files[0]
    let img = document.createElement("img");
    img.src = URL.createObjectURL(imgFile);
    img.onload = function () {
          if(img.width < 200 || img.height < 200 || img.width > 4000 || img.height > 4000) {
            setFileError('Минимальная и максимальная ширина файла 200px и 4000px')
        } else if (file) {
          setFileError('Поле не должно быть пустым')
        } else {
          setFileError('')
          setFile(e.target.files[0])
        }
        };
  }

  const nameHandler = (e) => {
    setName(e.target.value)
    if (e.target.value.length < 20 || e.target.value.length > 60) {
      setNameError('Поле должно быть больше 20 и меньше 60 символов')
      if(!e.target.value) {
        setNameError('Поле не должно быть пустым')
      }
    } else {
      setNameError('')
    }
  }

  const descriptionHandler = (e) => {
    setDescription(e.target.value)
    return (e.target.value.length > 200) ? setDescriptionError('Поле должно быть больше 200 символов') : setDescriptionError('')
  }

  const aDiscountHandler = (e) => {
    setADiscount(+e.target.value)
    if ((+e.target.value ^ 0) === +e.target.value) {
      setDiscountError('')
      if (+e.target.value < 10 || +e.target.value > 90) {
        setDiscountError('число должно быть больше 10 и меньше 90')
      }
    } else {
      setDiscountError('число должно быть целым')
    }
  }

  const endOfDiscountHandler = (e) => {
    setEndOfDiscount(e.target.value)
    console.log(e.target.value);
    let result = isBefore(new Date(dateFormatted), new Date(e.target.value))
    if (!result) {
      setEndOfDiscountError('Данная дата меньше текущей')
    } else {
      setEndOfDiscountError('')
    }
  }

  const priceHandler = (e) => {
    setPrice(+e.target.value)
    if (+e.target.value > 99999999.99) {
      setPriceError('Цена может быть больше 99999999.99 $')
    if(!e.target.value) {
      setPriceError('Поле не должно быть пустым')
    }
  } else {
    setPriceError('')
  } 
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'price':
        setPriceDirty(true)
        break
      case 'file':
        setFileDirty(true)
        break
      case 'endOfDiscount':
        setEndOfDiscountDirty(true)
        break
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    func({
      name: name,
      description: description,
      price: price,
      aDiscount: aDiscount,
      endOfDiscount: endOfDiscount,
      img: file,
    });
    setName('');
    setDescription('');
    setFile('')
    setPrice('')
    setADiscount('')
    setEndOfDiscount('')
  }

  return (
    <div className="container">
      <form className="form-block" onSubmit={handleSubmit}>
        <h2>{textForm}</h2>

        {(fileDirty && fileError) && <div style={{color: 'red'}}>{fileError}</div>}
        <input className="form-block__item" onBlur={e => blurHandler(e)} onChange={fileHandler} name="file" type="file"  />

        {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
        <input className="form-block__item" onBlur={e => blurHandler(e)} name="name" type="text" value={name} onChange={nameHandler} placeholder="name"/>

        {(descriptionError) && <div style={{color: 'red'}}>{descriptionError}</div>}
        <textarea className="form-block__item" name="description" cols="30"rows="5" value={description} onChange={descriptionHandler} placeholder="description"></textarea>

        {(priceDirty && priceError) && <div style={{color: 'red'}}>{priceError}</div>}
        <input className="form-block__item" onBlur={e => blurHandler(e)} name="price" type="text" value={price} onChange={priceHandler} placeholder="price"/>

        {(aDiscountError) && <div style={{color: 'red'}}>{aDiscountError}</div>}
        <input className="form-block__item" name="aDiscount" type="text" value={aDiscount} onChange={aDiscountHandler} placeholder="aDiscount"/>

        {(endOfDiscountDirty && endOfDiscountError) && <div style={{color: 'red'}}>{endOfDiscountError}</div>}
        <input className="form-block__item" onBlur={e => blurHandler(e)} disabled={!aDiscount} name="endOfDiscount" min="2021-05-01" max="2022-12-12" type="date" value={endOfDiscount} onChange={endOfDiscountHandler}/>

        <Button classButton={"button button-submit"} disabled={!formValid} type={'submit'} value={'submit'} />
      </form>
    </div>
  );
}

export default FormCart;