import React from 'react'
import photo404 from '../../images/error.svg'

export default function Notfound() {
  return <>
  <div className=' container vh-100 d-flex justify-content-center align-items-center'>
    <div>
      <img className=' w-100' src={photo404} alt="error 404" />
    </div>
  </div>
  </>
}
