import axios from 'axios'
import { useContext } from 'react';
// import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../Context/Wishlist';



export default function Products() {

  let {addProductToCart, getUserCart} = useContext(cartContext);
  let {addProductToWishlist, getWishList} = useContext(wishListContext);
  

  async function addToWishlist(id) {
    
    try {
      await addProductToWishlist(id)
      getWishList();
    
    } catch (error) {
      console.log(error);
    }
    
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
    

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let {data, isLoading, } = useQuery("products", getAllProducts);

  // const [allProducts, setAllProducts] = useState(null)
  // async function getAllProducts() {
  //   try {
  //     let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //     setAllProducts(data.data);
  //   }
  //   catch(error) {
  //     console.log(error);
  //   }
    
  // };

  // useEffect(function() {
  //   getAllProducts();
  // }, [])
  
  return <>
  <div className=' container py-5 my-5'>
    <h2 className=' my-5 bordered-text position-relative text-center'>All Products</h2>
      <div className=' row gy-5'>
      {isLoading ? <div className=' vh-100 d-flex justify-content-center align-items-center'>
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
        </div>: data?.data.data.map((product, idx) => {return <div key={idx} className=' col-lg-2 col-md-3 col-6'>
         
          <div className="card position-relative shadow home-card">
            <div onClick={() => {addToWishlist(product.id)}} style={{cursor:'pointer'}} className=' position-absolute top-0 end-0'>
            <i className="fa-regular fa-heart fs-4"></i>
            </div>
          <Link to={`/productdetails/${product.id}`}>
          <div  >
              <img style={{height:'200px'}} className=' w-100 card-img-top' src={product.imageCover} alt="product" />
              <div className="card-body">
              <p className=' main-color card-text m-0 text-center'>{product.category.name}</p>
              <p className=' h6 card-text text-center'>{product.title.split(" ").slice(0, 2).join(" ")}</p>
              <div className=' d-flex justify-content-between align-items-center'>
                <p className=' fw-bold'>{product.price} EGP</p>
                <p><i style={{'color':'#FFD700'}} className="fa-solid fa-star"></i><span className=' text-muted'> {product.ratingsAverage}</span></p>
              </div>
              </div>
          </div>
          </Link>
          <div>
          <button onClick={() => {addProduct(product.id)}} className=' btn btn-success w-100'>+ Add To Cart</button>
          </div>
          </div>
          
        </div> })}
      </div>
      
    </div>
    
    

  </>
}
