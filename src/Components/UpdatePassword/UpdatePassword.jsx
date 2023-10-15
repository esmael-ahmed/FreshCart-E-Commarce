import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/Authentication';

export default function UpdatePassword() {
    let [errMesg, setErrMesg] = useState(null);
    let [succesMesg, setSuccesMesg] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    let navigate = useNavigate();
    let {setToken, token} = useContext(authContext);
    let user = {
        email:'',
        newPassword:'',
        
    }
  
    async function whenClick(values) {
      setisLoading(true);
      try{
        const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
        
          setSuccesMesg('Successfully Changed Password');
        //   localStorage.setItem('token', data.token);
        //   setToken(data.token);
          setTimeout (function () {
            navigate('/login');
          }, 2000)
        
        
      }
      catch(err) {
        setErrMesg(err);
        
      }
      setisLoading(false);
    }
  
    function validationFunc(values) {
      setErrMesg(null)
      let errors = {}
      
      if (!values.email.includes('@') || !values.email.includes('.'))
    {
      errors.email = 'email must be a valid email address';
    }
      
      if (values.newPassword.length < 6 || values.newPassword.length > 20)
      {
        errors.newPassword = 'password must be from 6 to 20 characters';
      }
      
    return errors;
  }
  
    const formikObj = useFormik({
      initialValues: user,
      onSubmit: whenClick,
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
      
      <h2 className=' text-center'>Forgot Password :</h2>
      <form onSubmit={formikObj.handleSubmit} action="">
    
      <div className="my-2">
        <label htmlFor="email">Email :</label>
        <input onBlur={formikObj.handleBlur} id='email' onChange={formikObj.handleChange} value={formikObj.values.email} placeholder='Email' type="email" className=' form-control' />
        {formikObj.touched.email && formikObj.errors.email ? <div className=' alert alert-danger my-1'>{formikObj.errors.email}</div> : ""}
      </div>
      <div className="my-2">
        <label htmlFor="newPassword">New Password :</label>
        <input onBlur={formikObj.handleBlur} id='newPassword' onChange={formikObj.handleChange} value={formikObj.values.newPassword} placeholder='New Password' type="password" className=' form-control' />
        {formikObj.touched.newPassword && formikObj.errors.newPassword ? <div className=' alert alert-danger my-1'>{formikObj.errors.newPassword}</div> : ""}
      </div>
      
      <div className="my-2 d-flex justify-content-center">
        <div>
        <button disabled={!formikObj.dirty || !formikObj.isValid} type='submit' className=' btn btn-success '>{isLoading? <RotatingLines
    strokeColor="white"
    strokeWidth="5"
    animationDuration="0.75"
    width="35"
    visible={true}
  /> : "Reset Password"} </button>
        </div>
        
      </div>
      </form>
      </div>
    </div>
    </div>
    </>
}
