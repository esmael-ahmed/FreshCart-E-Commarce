import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/Authentication';
import { cartContext } from '../../Context/CartContext';

export default function Login() {

  let [errMesg, setErrMesg] = useState(null);
  let [succesMesg, setSuccesMesg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  let {setToken} = useContext(authContext);
  let {getUserCart} = useContext(cartContext);
  let user = {
    email:'',
    password:'',
  }

  function forgotPassword () {
    navigate('/forgotpassword')
  }

  async function whenLogin(values) {
    console.log('sending data');
    console.log(values);
    setisLoading(true);
    try{
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === 'success')
      {
        setSuccesMesg('Successfully Logged in');
        localStorage.setItem('token', data.token);
        setToken(data.token);
        getUserCart();
        setTimeout (function () {
          navigate('/home');
        }, 2500)
      }
      
    }
    catch(err) {
      setErrMesg(err.response.data.message);
      
    }
    setisLoading(false);
    

  //   const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
  //   .catch(err => {
  //     console.log(err.response.data.message);
  //   })
  //   console.log(data.message);//
  }

  function validationFunc(values) {
    setErrMesg(null)
    let errors = {}
    
    if (!values.email.includes('@') || !values.email.includes('.'))
    {
      errors.email = 'email must be a valid email address';
    }
    
    if (values.password.length < 6 || values.password.length > 20)
    {
      errors.password = 'password must be from 6 to 20 characters';
    }
    
  return errors;
}

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: whenLogin,
    validate: (values) => {
        let errors = validationFunc(values);
        return errors;
    },
  })

  return <>
  <div className=' pt-5'>
  <div className=' w-75 m-auto shadow rounded my-5'>
    <div className=' p-3'>
    {errMesg? <div className=' alert alert-danger text-center'>{errMesg}</div> : ''}
    {succesMesg? <div className=' alert alert-success text-center'>{succesMesg}</div> : ''}
    
    <h2 className=' text-center'>Login :</h2>
    <form onSubmit={formikObj.handleSubmit} action="">
  
    <div className="my-2">
      <label htmlFor="email">Email :</label>
      <input onBlur={formikObj.handleBlur} id='email' onChange={formikObj.handleChange} value={formikObj.values.email} placeholder='Email' type="email" className=' form-control' />
      {formikObj.touched.email && formikObj.errors.email ? <div className=' alert alert-danger my-1'>{formikObj.errors.email}</div> : ""}
    </div>
    <div className="my-2">
      <label htmlFor="password">Password :</label>
      <input onBlur={formikObj.handleBlur} id='password' onChange={formikObj.handleChange} value={formikObj.values.password} placeholder='Password' type="password" className=' form-control' />
      {formikObj.touched.password && formikObj.errors.password ? <div className=' alert alert-danger my-1'>{formikObj.errors.password}</div> : ""}
    </div>
    
    <div className="my-2 d-flex justify-content-between">
      <div>
      <button disabled={!formikObj.dirty || !formikObj.isValid} type='submit' className=' btn btn-success '>{isLoading? <RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="35"
  visible={true}
/> : "Login"} </button>
      </div>

      <div>
        <button onClick={forgotPassword} className=' btn btn-warning'>Forgot Password !</button>
      </div>
      
    </div>
    <div className=' text-center h5 my-4 '>
      <Link to={'/register'}>Don’t have an Account?</Link>
    </div>
    </form>
    </div>
  </div>
  </div>
  </>
}
