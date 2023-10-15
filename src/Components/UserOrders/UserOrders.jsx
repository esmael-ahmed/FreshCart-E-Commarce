import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';

export default function UserOrders() {

    const [orders, setOrders] = useState(null)

    async function getUserOrders(id) {
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            console.log(data);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() =>{
        let res = jwtDecode(localStorage.getItem('token'));
        getUserOrders(res.id);
    }, [])

    if (!orders) {
        return <>
        <div className=' vh-100 d-flex justify-content-center align-items-center'>
        <MutatingDots 
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor= '#4fa94d'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        </div>
        </>

    }


  return <>
    <div className=' container my-5 py-5'>
        <div className=' p-3'>
            
            <h2 className=' mb-3'>All Orders</h2>
            <div className=' row gy-5'>
                {orders.map(function(order, idx) { return <div key={idx} className=' col-12 cart-bg rounded p-3'>
                    <h3 className=' text-center'>Order ( {idx + 1} )</h3>
                    <div>
                        <h5 className=' mb-2'>Cart Items :</h5>
                        <div className=' row g-4 border-bottom border-success border-2 pb-3 mb-2'>
                        {order.cartItems.map(function(cartItem, index) {return <div key={index} className='  col-6 col-md-4 col-lg-3  px-3  text-center'>
                            <div className=' bg-success'>
                            <div>
                                    <img className=' w-100' src={cartItem.product.imageCover} alt="item" />
                                </div>
                           
                            
                                <div>
                                    <p className=' m-0 h6'><span className=' text-light'>Name : </span>{cartItem.product.title.split(' ').slice(0, 2).join(' ')}</p>
                                </div>
                                <div>
                                    <p  className=' m-0 h6'><span className=' text-light'>Count : </span>{cartItem.count}</p>
                                </div>
                                <div>
                                    <p  className=' m-0 h6'><span className=' text-light'>Price : </span>{cartItem.price}</p>
                                </div>
                            </div>
                                
                            
                        </div> })}
                        </div>
                        
                        
                    </div>
                    <div>
                    <ul>
                        <li className=' h6 list-unstyled'>Shipping Address : <ul>
                                    <li>
                                        Phone : {order.shippingAddress.phone}
                                    </li>
                                    <li>
                                        City : {order.shippingAddress.city}
                                    </li>
                                    <li>
                                        Details : {order.shippingAddress.details}
                                    </li>
                                </ul>
                        </li>
                    </ul>
                    </div>
                    <h6>Total Cart Price : {order.totalOrderPrice}</h6>
                    <h6>Payment Method : {order.paymentMethodType}</h6>
                </div> })}
                
            </div>
            
        </div>

    </div>
  </>
}
