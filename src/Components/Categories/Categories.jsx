import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { MutatingDots } from 'react-loader-spinner';

export default function Categories() {

  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let {data, isLoading} = useQuery('allCategories', getAllCategories);
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
      <h2 className=' text-center my-5 bordered-text position-relative'>All Categories</h2>
      <div className=' row gy-4'>
        {data?.data.data.map(function(category, idx) { return <div key={idx} className=' col-md-3 col-sm-4 col-6'>
          <div>
            <div className="card shadow" >
              <img style={{height:'200px'}} src={category.image} className=" w-100 card-img-top" alt={category.name}/>
              <div className="card-body">
              <p className="card-text text-center">{category.name}</p>
              </div>
          </div>
        </div>
        </div> })}
        
      </div>

    </div>
  </>
}
