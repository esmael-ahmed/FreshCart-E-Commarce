import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    let [errMesg, setErrMesg] = useState(null);
  let [succesMesg, setSuccesMesg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

    let user = {
        email:'',
      }


      async function whenClick(values) {
        setisLoading(true);
        try{
          const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
          if (data.statusMsg === 'success')
          {
            setSuccesMesg(data.message);
            console.log(data);
            
            setTimeout (function () {
              navigate('/resetcode');
            }, 2000)
          }
          
        }
        catch(err) {
          setErrMesg(err.response.data.message);
          
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
    <div className="my-2 d-flex justify-content-center">
      <div>
      <button disabled={!formikObj.dirty || !formikObj.isValid} type='submit' className=' btn btn-success '>{isLoading? <RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="35"
  visible={true}
/> : "Send Reset Code"} </button>
      </div>

      
    </div>
        </form>
    </div>

  </div>
  </div>
  </>
}
