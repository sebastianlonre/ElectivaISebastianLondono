import { useContext, useEffect } from 'react'
import { ProductGrid, Carousel } from '../components';
import { SocialContext } from '../../social/context';

export const HomePage = () => {

  return (
    <>
    <div>
      <div className="container mt-2">
        <div className="row">
          <ProductGrid />
        </div>
      </div>

    </div>


    </>

  )
}
