import React,{useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import {getCartItems,removeCartItem,onSuccessBuy} from '../../../_actions/user_actions'
import UserCardBlock from '../../views/CartPage/sections/UserCardBlock'
import Paypal from '../../utils/Paypal'
import {Result,Empty} from 'antd'
import Axios from 'axios'

function CartPage(props) {
    
    const [Total,SetTotal] = useState(0)
    const [ShowTotal,SetShowTotal]=useState(false)
    const [ShowSuccess,SetShowSuccess]=useState(false)
    const dispatch = useDispatch();
    useEffect(()=>{

    
    let cartItems = []
if(props.user.userData && props.user.userData.cart){
    if (props.user.userData.cart.length > 0){
        props.user.userData.cart.forEach(item =>{
         cartItems.push(item.id)
        })
        dispatch(getCartItems(cartItems,props.user.userData.cart))
    }
}
  },[props.user.userData])  
    //calculate total 
      useEffect(()=>{
     if(props.user.cartDetail && props.user.cartDetail.length > 0){
           calculateTotal(props.user.cartDetail)
     }

      },[props.user.cartDetail])

    const calculateTotal = (cartDetail)=>{
         let total = 0;
         cartDetail.map(item =>{
             total += parseInt(item.price,10) * item.quantity
         })
         SetTotal(total)
         SetShowTotal(true)
         console.log('totalistotal',total)
         
     }
    
     // remove item
      const removeFromCart = (productId)=>{
              dispatch(removeCartItem(productId))
              Axios.get('/api/users1/userCartInfo')
              .then(response=>{
                if (response.data.success){
                
                  
                  
                  if(response.data.cartDetail.length <= 0){
                    SetShowTotal(false)
                  } else {
                    calculateTotal(response.data.cartDetail)
                  }

                }else(
                  alert('failed to get cart information')
                )
              })
              
      }

      const transactionSuccess =(data)=>{
           let variables = {
             cartDetail:props.user.cartDetail,paymentData:data
           }
         
           Axios.post('/api/users1/successBuy',variables)
              .then(response =>{
                if(response.data.success){
                  SetShowSuccess(true)
                  SetShowTotal(false)
                  dispatch(onSuccessBuy({cart:response.data.cart,
                  cartDetail:response.data.cartDetail})) 
                  console.log('successCart',response.data.cart)
                }else{
                  alert('failed to buy it')
                }
              })
          }

      const transactionCancelled =()=>{
         console.log('transaction cancelled')
      }

      const transactionError =()=>{
           console.log('Paypal error')
      }
   
   
      return (
        <div style={{width:'85%',margin:'3rem auto'}}>
        <h1>MyCart</h1>
        <div>
        <UserCardBlock
        products={props.user.cartDetail}
        removeItem={removeFromCart}
        
        />
       {ShowTotal ? 
        <div style={{marginTop:'3rem'}}>
        <h1>Total Amount: ${Total}</h1>
        </div>
                  :
       ShowSuccess ?
        <Result
        status='success'
        title='Successfully Purchase Items'
        /> :
     
        <div style={{width:'100%',display:'flex',
     flexDirection:'column',justifyContent:'center'}}>
       <br />
       <Empty description={false}/>
       <p>No Items in the Cart</p>
     
     
     </div>
       }
        </div>   
       
       {/*Paypal button*/}
       {ShowTotal &&
       
       <Paypal 
       toPay={Total}
       onSuccess={transactionSuccess}
       transactionError={transactionError}
       transactionCancelled={transactionCancelled}
    
       
       
       
       />}
        </div>
    )
}

export default CartPage

