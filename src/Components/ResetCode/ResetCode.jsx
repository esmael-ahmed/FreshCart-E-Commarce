import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
    let [errMesg, setErrMesg] = useState(null);
    let [succesMesg, setSuccesMesg] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    let navigate = useNavigate();
  
      let user = {
        resetCode:'',
        }
  
  
        async function whenClick(values) {
          setisLoading(true);
          try{
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
            if (data.status === 'Success')
            {
              setSuccesMesg('Successfully verified');
              
              
              setTimeout (function () {
                navigate('/updatepassword');
              }, 2000)
            }
            
          }
          catch(err) {
            setErrMesg('some thing went wrong...');
            console.log(err);
            
          }
          setisLoading(false);
          
        }
  
  
        function validationFunc(values) {
          setErrMesg(null)
          let errors = {}
          
          if (values.resetCode.length < 2)
          {
            errors.resetCode = 'Enter a valid reset code';
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
        <label htmlFor="resetCode">Reset Code :</label>
        <input onBlur={formikObj.handleBlur} id='resetCode' onChange={formikObj.handleChange} value={formikObj.values.resetCode} placeholder='ResetCode' type="tel" className=' form-control' />
        {formikObj.touched.resetCode && formikObj.errors.resetCode ? <div className=' alert alert-danger my-1'>{formikObj.errors.resetCode}</div> : ""}
      </div>
      <div className="my-2 d-flex justify-content-center">
        <div>
        <button disabled={!formikObj.dirty || !formikObj.isValid} type='submit' className=' btn btn-success '>{isLoading? <RotatingLines
    strokeColor="white"
    strokeWidth="5"
    animationDuration="0.75"
    width="35"
    visible={true}
  /> : "Verify Reset Code"} </button>
        </div>
  
        
      </div>
          </form>
      </div>
  
    </div>
    </div>
    </>
}
