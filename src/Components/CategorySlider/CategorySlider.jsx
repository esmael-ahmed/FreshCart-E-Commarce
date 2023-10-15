import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';


export default function CategorySlider() {

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    };

    let {data, isLoading} = useQuery('categorySlider', getAllCategories);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: false,
        autoplay :true,
      };

      if (isLoading) {
        return <>
        <div className=' d-flex justify-content-center align-items-center'>
            <ThreeDots  
                height="80" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
        </>
      }
  return <>
    <div className=' container mt-3 mb-4'>
        <h3 className=' text-center my-5 bordered-text position-relative'>All Categories</h3>
        <div className=' row'>
        <Slider {...settings}>
            {data?.data.data.map(function(category, idx) {return <div key={idx}>
            <img style={{width:'100%', height:'200px'}} src={category.image} alt="slider" />
            <h6 className=' text-center pt-2'>{category.name}</h6>
          </div>
            })}
            
        </Slider>
        </div>
        {/* <Slider {...settings}>
            {data?.data.data.map(function(category, idx) { return <div>
            <img style={{width:'100%', height:'200px'}} src={category.image} alt="slider" />
            <h6 className=' text-center'>{category.name}</h6>
          </div>})}
        </Slider> */}
      </div>
  </>
}
