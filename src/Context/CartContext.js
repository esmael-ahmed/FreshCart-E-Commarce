import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
import toast from "react-hot-toast";

export let cartContext = createContext()


export default function CartProvider({children}) {

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartProducts, setCartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartId, setCartId] = useState(null);
    useEffect(() => {
        getUserCart();

    }, [])
    

    async function addProductToCart (productID) {
        try{
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                "productId": productID
            }, {
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            // setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);
            return data;
        }
        catch(err){
            console.log(err);
        }
        
    };

    async function getUserCart () {
        try {
            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers : {
                token : localStorage.getItem('token'),
            }
        })
        console.log(data);
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);
            setCartId(data.data._id);
            
        } catch (error) {
            console.log(error);
        }
        
    }

    async function deleteProduct (productId) {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: {
                    token: localStorage.getItem('token'),
                }
            })
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);
            return data;
            
        } catch (error) {
            console.log(error);
        }
    }

    async function updateProductCount(productId, count) {
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            "count": count
        }, {headers: {
            token: localStorage.getItem('token'),
        }});
            setCartProducts(data.data.products);
            setTotalCartPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);
            return data;
        } catch (error) {
            console.log(error);
        }
        
    }

    async function removeCart() {
        try {
          let {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {headers: {
          token: localStorage.getItem('token'),
        }})
        if (data.message === 'success') {
          toast.success('Cart deleted successfully');
          
        }
        else {
          toast.error('Something went wrong...');
        }
        } catch (error) {
          console.log(error);
        }
        setCartProducts(null);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
      }

  return <cartContext.Provider value={{addProductToCart,
   getUserCart,
    deleteProduct ,
     updateProductCount,
      setCartProducts,
       setTotalCartPrice,
        setNumOfCartItems,
         removeCart,
          totalCartPrice,
           cartProducts,
            numOfCartItems, 
              cartId,}}>
    {children}
  </cartContext.Provider>
}
