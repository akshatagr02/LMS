import React, { useEffect } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Toast = ({json}) => {
useEffect(() => {
  

 console.log('json', json)
  
  
    
  }, [])

  
  return (
    <>
           <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />

      
    </>
  )
}

export default Toast
