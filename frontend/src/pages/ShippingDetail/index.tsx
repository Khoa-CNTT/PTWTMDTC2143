import React from 'react'
import Shipping from '../../components/Shipping';
import RecentlyViewed from '../../components/RecentlyViewed';




const ShippingDetail: React.FC = () => {
  return (
    <>
    <Shipping/>
      <div className="p-6">
        <div className='bg-gray-200 pb-3 rounded shadow-md'>
          <div className='container'><h3 className="mt-20 text-[30px] font-[500] flex items-center">Recently Viewed</h3>
          <RecentlyViewed/>
          </div>
        </div>
      </div>
    </>


  )
}

export default ShippingDetail;