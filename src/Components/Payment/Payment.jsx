import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Payment() {

    let {cartId,setCartProducts,
        setTotalCartPrice,
         setNumOfCartItems,} = useContext(cartContext);
    const [isloading, setIsLoading] = useState(false)
    const [isloadingON, setIsLoadingON] = useState(false)
    let navigationFunc = useNavigate();



    async function CreateOnlineOrder() {
        let phoneValue =  document.getElementById('phone').value;
        let cityValue =  document.getElementById('city').value;
        let detailsValue =  document.getElementById('details').value;
        let inputsObj = {
            "shippingAddress":{
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
                }
        }
        try {
            setIsLoadingON(true);
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, inputsObj, {
                headers: {
                    token: localStorage.getItem('token'),
                }, 
                params: {
                    // url: window.location.origin
                    url: window.location.origin
                }
            })
            console.log(data);
            if (data.status === 'success') {
                toast.success('Order Confirmed successfully')
                // setCartProducts(null);
                // setNumOfCartItems(0);
                // setTotalCartPrice(0);
                window.open(data.session.url);
            }
            else {
                toast.error('something went wrong...');
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoadingON(false);
    }



    async function CreateCashOrder() {
        let phoneValue =  document.getElementById('phone').value;
        let cityValue =  document.getElementById('city').value;
        let detailsValue =  document.getElementById('details').value;
        let inputsObj = {
            "shippingAddress":{
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityValue
                }
        }
        try {
            setIsLoading(true);
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, inputsObj, {
                headers: {
                    token: localStorage.getItem('token'),
                }
            })
            console.log(data);
            if (data.status === 'success') {
                toast.success('Order Confirmed successfully')
                setCartProducts(null);
                setNumOfCartItems(0);
                setTotalCartPrice(0);
                setTimeout(() => {
                    navigationFunc('/products')
                }, 1500);
            }
            else {
                toast.error('something went wrong...');
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

  return <>
    <div className=' container my-5 py-5'>
        <div className=' w-75 m-auto'>
            <form>
                <div className=' mb-4'>
                    <label className=' mb-1' htmlFor="phone">Your Phone :</label>
                    <input id='phone' placeholder='Phone' className=' form-control' type="tel" />
                </div>
                <div className=' mb-4'>
                    <label className=' mb-1' htmlFor="city">Your City :</label>
                    <input id='city' placeholder='City' className=' form-control' type="text" />
                </div>
                <div className=' mb-4'>
                    <label className=' mb-1' htmlFor="details">Details :</label>
                    <textarea id='details' placeholder='Delivery Details' className=' form-control' type="text" />
                </div>
                <div className=' d-flex justify-content-evenly align-items-center'>
                    <div className=' h6'>
                    <button onClick={CreateCashOrder} type='button' className=' btn btn-success'>{!isloading? "Confirm Cash Payment" : <RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="35"
  visible={true}
/>}</button>
                    </div>
                    <div className=' mx-2 h6'>
                        OR
                    </div>
                    <div className=' h6'>
                    <button onClick={CreateOnlineOrder} type='button' className=' btn btn-success'>{!isloadingON? "Confirm Online Payment" : <RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="35"
  visible={true}
/>}</button>
                    </div>
                    
                </div>
            </form>
        </div>
    </div>
  </>
}
