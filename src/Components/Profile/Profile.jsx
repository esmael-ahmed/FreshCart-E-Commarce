
import React, { useContext } from 'react'
import { authContext } from '../../Context/Authentication';

export default function Profile() {
  let {name} = useContext(authContext)

  
  
  return <>
    <div className=' container my-5 py-5 d-flex justify-content-center'>
      <div>
      <div className="alert alert-success" role="alert">
  Hello! {name}
</div>
      </div>
    </div>
  </>
}
