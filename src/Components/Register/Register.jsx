import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  let [errMesg, setErrMesg] = useState(null);
  let [succesMesg, setSuccesMesg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  let user = {
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
  }

  async function whenRegister(values) {
    console.log('sending data');
    console.log(values);
    setisLoading(true);
    try{
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      if (data.message === 'success')
      {
        setSuccesMesg('Successfully Signed Up');
        setTimeout (function () {
          navigate('/login');
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
    if (values.name.length < 4 || values.name.length > 20)
    {
      errors.name = 'name mut be from 4 to 20 characters';
    }
    if (!values.email.includes('@') || !values.email.includes('.'))
    {
      errors.email = 'email must be a valid email address';
    }
    if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/))
    {
      errors.phone = 'invalid phone number';
    }
    if (values.password.length < 6 || values.password.length > 20)
    {
      errors.password = 'password must be from 6 to 20 characters';
    }
    if (values.rePassword !== values.password)
    {
      errors.rePassword = 'password and rePassword must be the same';
    }
  return errors;
}

  const formikObj = useFormik({
    initialValues: user,
    onSubmit: whenRegister,
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
    
    <h2 className=' text-center'>Register Now :</h2>
    <form onSubmit={formikObj.handleSubmit} action="">
    <div className=' my-2'>
      <label htmlFor="name">Name :</label>
      <input onBlur={formikObj.handleBlur} id='name' onChange={formikObj.handleChange} value={formikObj.values.name} placeholder='Name' type="text" className=' form-control' />
      {formikObj.touched.name && formikObj.errors.name ? <div className=' alert alert-danger my-1'>{formikObj.errors.name}</div> : ""}
    </div>
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
    <div className="my-2">
      <label htmlFor="rePassword">rePassword :</label>
      <input onBlur={formikObj.handleBlur} id='rePassword' onChange={formikObj.handleChange} value={formikObj.values.rePassword} placeholder='rePassword' type="password" className=' form-control' />
      {formikObj.touched.rePassword && formikObj.errors.rePassword ? <div className=' alert alert-danger my-1'>{formikObj.errors.rePassword}</div> : ""}
    </div>
    <div className="my-2">
      <label htmlFor="phone">Phone :</label>
      <input onBlur={formikObj.handleBlur} id='phone' onChange={formikObj.handleChange} value={formikObj.values.phone} placeholder='Phone' type="tel" className=' form-control' />
      {formikObj.touched.phone && formikObj.errors.phone ? <div className=' alert alert-danger my-1'>{formikObj.errors.phone}</div> : ""}

    </div>
    <div className="my-2 d-flex justify-content-center">
      <button disabled={!formikObj.dirty || !formikObj.isValid} type='submit' className=' btn btn-success '>{isLoading? <RotatingLines
  strokeColor="white"
  strokeWidth="4"
  animationDuration="0.75"
  width="30"
  visible={true}
/>  : "Register"} </button>
    </div>
    </form>
    </div>
  </div>
  </div>
  {/* <RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="35"
  visible={true}
/> */}
  </>
}
