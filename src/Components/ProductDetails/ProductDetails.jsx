import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MutatingDots, RotatingLines } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    let {addProductToCart, getUserCart} = useContext(cartContext);
    let {id} = useParams();
    const [isAdding, setIsAdding] = useState(false)

    async function addProduct (id) {
        setIsAdding(true);
        let res = await addProductToCart(id);
        if (res.status === 'success') {
             getUserCart()
            toast.success(res.message, {
                duration: 2000
            })
        }
         else{
            toast.error('Somting Wrong ...')
        }
        setIsAdding(false);
    }

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let {data, isLoading} = useQuery('productDetails', getProductDetails)
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay :true,
      };

      if (isLoading) {
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
    <div className=' container my-5 pt-5'>
        <div className=' row justify-content-center align-items-center gy-5'>
            <div className=' col-md-4'>
                <Slider {...settings}>
                    {data?.data.data.images.map(function(image, idx) {return <div key={idx}>
                    <img className=' w-100' src={image} alt={data?.data.data.title} />
                </div>})}
                </Slider>
                
            </div>
            <div className=' col-md-8 '>
                <div className=' text-center'>
                    <h2>{data?.data.data.title}</h2>
                    <p className=' text-muted'>{data?.data.data.description}</p>
                    <p>{data?.data.data.category.name}</p>
                    <div className=' d-flex justify-content-between align-items-center'>
                        <p className=' fw-bold'>Price : {data?.data.data.price} EGP</p>
                        <p><i style={{'color':'#FFD700'}} className="fa-solid fa-star"></i><span className=' text-muted'> {data?.data.data.ratingsAverage}</span></p>
                    </div>
                    <button onClick={() => {addProduct(data?.data.data.id)}} className=' btn btn-success w-100'>{!isAdding?"+ Add To Cart":<RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="35"
  visible={true}
/>}</button>
                </div>
            </div>
            
        </div>
    </div>
  </>
}
