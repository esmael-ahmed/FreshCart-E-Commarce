import React, { useContext } from 'react'
import axios from 'axios'
import { MutatingDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../Context/Wishlist';


export default function Home() {

  let {addProductToCart, getUserCart} = useContext(cartContext);
  let {addProductToWishlist, getWishList, deleteProductFromWishList} = useContext(wishListContext);

  async function addToWishlist(id) {
    
    try {
      await addProductToWishlist(id)
      getWishList();
     
    
    } catch (error) {
      console.log(error);
    }
   
  }
  async function removeFromWishlist(id) {
    
    try {
      await deleteProductFromWishList(id)
      getWishList();
     
    
    } catch (error) {
      console.log(error);
    }
   
  }
 
async function addProduct (id) {
        
        let res = await addProductToCart(id);
        if (res.status === 'success') {
          getUserCart();
          toast.success(res.message, {
            duration: 2000
        })
        }
        else{
          toast.error('Somting Wrong ...')
      }
      
    }
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let {data, isLoading, } = useQuery("products", getAllProducts);
  return <>
  <div className=' container my-5 pt-5'>
    <div className=' row gx-0 mb-5'>
      <div className=' col-12 col-sm-8'>
        <HomeSlider />
      </div>
      <div className=' d-none d-sm-block col-sm-4 '>
        <img style={{width:'100%', height:'200px'}}  src={require('../../images/slider-2.jpeg')} alt="slider" />
        <img style={{width:'100%', height:'200px'}}  src={require('../../images/grocery-banner-2.jpeg')} alt="slider" />
      </div>

    </div>
    <div className=' d-flex justify-content-center align-items-center my-4'>
      <CategorySlider />
    </div>
    
    
      <div className=' row gy-5'>
        <h3 className=' my-5 bordered-text position-relative text-center'>Trending Products</h3>
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
        </div>: data?.data.data.slice(0, 18).map((product, idx) => {return <div key={idx} className=' col-lg-2 col-md-3 col-6'>
          
          <div className="card position-relative shadow home-card">
          {localStorage.getItem('wishlistIds')?.includes(product.id)? <div onClick={() => {removeFromWishlist(product.id)}} style={{cursor:'pointer'}} className=' position-absolute top-0 end-0'>
               <i className="fa-solid fa-heart fs-4 text-danger"></i>
            </div>  : <div onClick={() => {addToWishlist(product.id)}} style={{cursor:'pointer'}} className=' position-absolute top-0 end-0'>
               <i className="fa-regular fa-heart fs-4"></i>
            </div>}
          <Link to={`/productdetails/${product.id}`}>
          <div>
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
