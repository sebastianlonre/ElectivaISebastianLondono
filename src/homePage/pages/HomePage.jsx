import { useContext, useEffect } from 'react'
import { ProductGrid, Carousel } from '../components';
import { SocialContext } from '../../social/context';

export const HomePage = () => {
  const {followUser} = useContext(SocialContext)
  const userID = 'Apql2twxuIeGo02eDfHAsCbNDR03';

  const handlePrueba = async () => {
    followUser(userID)
  }

  return (
    <>
    <div>
      <div className="container mt-2">
        <div className="row">
          <button onClick={handlePrueba}>aa</button>
          <ProductGrid />
        </div>
      </div>

    </div>


    </>

  )
}
