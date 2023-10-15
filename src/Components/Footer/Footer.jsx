import React from 'react'

export default function Footer() {
  return <>
  <div className=' footer py-5 shadow-lg'>
  <div className=' container'>
    <div className=' row my-2'> 
    <div className=' col'> 
    <h3>Get the FreshCart App</h3>
    <p className=' text-muted'>We Will Send You a Link, Open It On Your Phone To Download The App</p>
    </div>
    </div>
    
    <div className=' row gx-0 my-3'>
      <div className=' col-8 col-md-10'>
        <div>
          <input className=' form-control' type="email" placeholder='Email' />
        </div>
      </div>
      <div className=' col-4 col-md-2'>
        <div className=' d-flex justify-content-end'>
          <button className=' btn btn-success'>Share App Link</button>
        </div>
      </div>

    </div>
    <div className=' d-flex justify-content-between align-items-center my-4'>
      <div className=' d-block d-md-flex text-center'>
        <div>
          <span className=' pe-1'>Payment Partners</span>
        </div>
        <div>
        <span className=' pe-2'><img style={{width:'50px'}} src={require('../../images/amazon.jpg')} alt="payment" /></span>
        <span className=' pe-2'><img style={{width:'30px'}} src={require('../../images/americanexpres.png')} alt="payment" /></span>
        <span className=' pe-2'><img style={{width:'30px'}} src={require('../../images/mastercard.png')} alt="payment" /></span>
        <span className=' pe-2'><img style={{width:'30px'}} src={require('../../images/paypal.png')} alt="payment" /></span>
        </div>
        
      </div>
      <div className=' d-block d-md-flex text-center'>
        <div>
        <span className=' pe-1'>Get Deliveries With FreshCart</span>
        </div>
        <div>
        <span className=' pe-2'><img style={{width:'70px'}} src={require('../../images/appstoreCrop.png')} alt="appstore" /></span>
        <span><img style={{width:'70px'}} src={require('../../images/googleplay.png')} alt="appstore" /></span>
        </div>
        
        
      </div>
    </div>
  </div>
  </div>
  </>
}
