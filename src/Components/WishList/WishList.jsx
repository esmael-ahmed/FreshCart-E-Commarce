import React, { useContext, useEffect } from 'react'
import { wishListContext } from '../../Context/Wishlist'
import { MutatingDots } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function WishList() {
  let {userWishList, getWishList } = useContext(wishListContext)
  let {deleteProductFromWishList} = useContext(wishListContext)
  let {addProductToCart, getUserCart} = useContext(cartContext);

  useEffect(() => {
    getWishList()
  }, [])
  
  async function deleteElement(id) {
    await deleteProductFromWishList(id);
  }

  async function addProduct (id) {
        
    let res = await addProductToCart(id);
    if (res.status === 'success') {
      getUserCart()
      toast.success(res.message)
    }
    else {
      toast.error('Somting Wrong ...')
  }
  
}

  if (!userWishList) {
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
  }
  return <>
    <div className=' container my-5 py-5'>
      <h3>My Wish List</h3>
      {userWishList?.map(function(product, idx) {return <div key={idx} className=' row  border-4 border-success border-bottom py-3 align-items-center'>
      <div className=' col-lg-2 col-md-2 col-3'>
          <div>
            <img className=' w-100' src={product.imageCover} alt="product" />
          </div>
        </div>
        <div className=' col-lg-8 col-md-7 col-6'>
          <div>
            <p className=' m-0'>{product.title}</p>
            <p className='  main-color'>Price : {product.price} EPG</p>
            <button onClick={() => {deleteElement(product.id)}} className=' btn btn-danger'><i className="fa-solid fa-trash-can main-color"></i> Remove</button>
          </div>
        </div>
        <div className=' col-lg-2 col-md-3 col-3'>
          <div className=' d-flex align-items-center justify-content-center'>
            <div>
              <button onClick={() => {addProduct(product.id)}}  className=' btn btn-success'>+ Add To Cart</button>
            </div>
            
          </div>
        </div>

      </div>})}
      
    </div>
  </>
}
