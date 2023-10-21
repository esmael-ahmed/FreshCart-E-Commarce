import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
import toast from "react-hot-toast";


export let wishListContext = createContext();



export default function WishlistProvider({children}) {
    const [userWishList, setUserWishList] = useState(null)
    const [wishListCount, setWishListCount] = useState(null)
    const [wishListProductesId, setWishListProductesId] = useState(null)


    useEffect(() => {
        getWishList();
    }, [])

    async function deleteProductFromWishList(id) {
      try {
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      if (data.status === 'success') {
        toast.success(data.message);
        getWishList();
        setWishListProductesId(data.data);
        localStorage.setItem('wishlistIds', JSON.stringify(data.data) )
      }
      } catch (error) {
        toast.error(error);
      }
      
    }

    async function getWishList() {
        try {
            let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        if (data.status === 'success') {
            setUserWishList(data.data);
            setWishListCount(data.count);
            localStorage.setItem('wishcount', data.count);
            return data;
        }
        } catch (error) {
            console.log(error);
        }
        
    }

    async function addProductToWishlist(id) {
    
        try {
          let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
          "productId": id
        }, { headers: {
          token: localStorage.getItem('token'),
        }})
        
        if (data.status === 'success') {
          toast.success(data.message);
          setWishListProductesId(data.data);
          localStorage.setItem('wishlistIds', JSON.stringify(data.data) )
          // setUserWishList(data.data);
          // setWishListCount(data.count);
          return data
        }
        else {
          toast.error('something went wrong...')
        }
        
        } catch (error) {
          console.log(error);
        }
    
      }
     


  return <wishListContext.Provider value={{userWishList, wishListCount, wishListProductesId, setWishListCount, setUserWishList, addProductToWishlist, getWishList, deleteProductFromWishList}}>


    {children}
  </wishListContext.Provider>
}
