import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {

  let { updateProductCount, deleteProduct, cartProducts, totalCartPrice,removeCart} = useContext(cartContext)

 

  async function handelUpdate(id, count) {
    if (count <= 0) {
      await deleteElement(id)
    }
    else {
      await updateElement(id, count);
    }
    
  }

  async function updateElement(id, count) {
   let res = await updateProductCount(id, count);
   if (res.data.products.length === 0) {
    await removeCart()
  }
   else if (res.status === 'success') {
    toast.success('Product updated successfully')
   }
   else {
    toast.error('Product not updated successfully')
   }
  }

  async function deleteElement(id) {
    let res = await deleteProduct(id);
    if (res.data.products.length === 0) {
      await removeCart()
    }
    else if (res.status === 'success') {
        toast.success('Product deleted')
    } 
    else {
      toast.error('Something went wrong...');
    }
    
  }

  if (!cartProducts) {
    
    return <>
    <div className=' container my-5 py-5  d-flex justify-content-center align-items-center'>
      <div>
      <div className="alert alert-warning" role="alert">
  Your Cart Is Empty, Add Products From Here =&gt;<Link to={'/products'} className="alert-link text-success">(Products Page)</Link>
</div>
      </div>

    </div>
    </>
  }
  return <>
  <div className=' mt-5 pt-5'>
  <div className=' container cart-bg p-4 my-5'>
    <div className=' d-flex justify-content-between align-items-center'>
    <div>
    <h2>Shop Cart</h2>
      <h6 className=' main-color'>Total Cart Price : {totalCartPrice} EGP</h6>
    </div>
    <div className=' text-center'>
    <div className=' mb-3'>
      <Link to={'/payment'}><button className=' btn btn-success'>Checkout</button></Link>
      
      </div>
      <div>
      <button onClick={removeCart} className=' btn btn-warning'>Remove Cart Items</button>
      </div>
    </div>
      
      
    </div>
      
      {cartProducts.map(function (product, idx) {return <div key={idx} className=' row border-4 border-success border-bottom py-3 align-items-center'>
        <div className=' col-lg-2 col-md-2 col-3'>
          <div>
            <img className=' w-100' src={product.product.imageCover} alt="product" />
          </div>
        </div>
        <div className=' col-lg-8 col-md-7 col-6'>
          <div>
            <p className=' m-0'>{product.product.title}</p>
            <p className='  main-color'>Price : {product.price} EPG</p>
            <button onClick={() => {deleteElement(product.product.id)}} className=' btn btn-outline-danger'><i className="fa-solid fa-trash-can main-color"></i> Remove</button>
          </div>
        </div>
        <div className=' col-lg-2 col-md-3 col-3'>
          <div className=' d-flex align-items-center justify-content-center'>
            <div>
              <button onClick={() => {handelUpdate(product.product.id, product.count + 1)}} className=' btn btn-outline-success'>+</button>
            </div>
            <div>
              <span className=' mx-2'>{product.count}</span>
            </div>
            <div>
              <button onClick={() => {handelUpdate(product.product.id, product.count - 1)}} className=' btn btn-outline-success'>-</button>
            </div>
          </div>
        </div>
      </div>})}
      
    </div>
  </div>
    
  </>
}
