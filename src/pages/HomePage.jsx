import React from 'react'
import { ProductGrid, Carousel } from '../components/homePage'
import { AuthContext } from '../context/auth/AuthContext';

export const HomePage = () => {
  return (
    <> 
    <div>
      <div className="container text-center mt-5">
        <div className="row">
            <Carousel/>
            <ProductGrid />
        </div>
      </div>
      
    </div>
     
    
    </>
    
  )
}
