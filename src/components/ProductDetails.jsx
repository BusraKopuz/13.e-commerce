import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

import '../components/ProductDetails.css';
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
    const {id} = useParams();
    const {products, selectedProduct} = useSelector((store) => store.product)

    const {price, image, title, description} = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }

        dispatch(addToBasket(payload));
        dispatch(calculateBasket());
    }

    useEffect(()=> {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if(product.id==id){
                dispatch(setSelectedProduct(product))
            }
        })
    }

  return (
    <div className='details'>
        <div className='details-img'>
            <img src={image} width={300} height={500} />
        </div>
        <div>
            <h1 className='details-title'>{title}</h1>
            <p className='details-p'>{description}</p>
            <h1 className='details-price'>{price}₺</h1>

            <div className='details-icon'>
                <CiCirclePlus onClick={increment} className='icon1' /> <span style={{fontSize: '35px'}}>{count}</span> <CiCircleMinus onClick={decrement} className='icon2' />
            </div>

            <div>
                <button
                onClick={addBasket} 
                className='button'>
                Sepete Ekle
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails