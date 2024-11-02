import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import Loading from './components/Loading'
import RouterConfig from './config/RouterConfig'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, removeFromBasket, setDrawer } from './redux/slices/basketSlice'

function App() {

  const {products, drawer, totalAmount} = useSelector((store)=> store.basket);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calculateBasket());
  },[])

  return (
    <PageContainer> 
      <Header />
      <RouterConfig />
      <Loading/>
      <Drawer className='drawer' anchor='right' onClose={()=> dispatch(setDrawer())} open={drawer}>
        {
          products && products.map((product) => {
            return(
              <div key={product.id}>
                <div className='flex-row' style={{padding:'20px'}}>
                  <img style={{marginRight: '5px'}} src={product.image} width={50} height={50} />
                  <p style={{width:'320px', marginRight:'5px'}}>{product.title}({product.count})</p>
                  <p style={{fontWeight:'bold', width:'60px'}}>{product.price}TL</p>
                  <button className='button' onClick={()=> dispatch(removeFromBasket(product.id))}>Sil</button>
                </div>
              </div>
            )
          })
        }
        <div>
          <p style={{textAlign:'center'}}>toplam tutar: {totalAmount}</p>
        </div>
      </Drawer>     
    </PageContainer>
  )
}

export default App
