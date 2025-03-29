import React from 'react'
import Product from '../../components/Product';
import HotSale from '../../components/HotSale';
import { FaFireAlt } from "react-icons/fa";
import RecentlyViewed from '../../components/RecentlyViewed';

const ProductPage = () => {
  return (
    <>
      <Product />
      <div className="p-6">
        <div className='bg-gray-200 pb-3 rounded shadow-md'>
          <div className='container'><h3 className="mt-20 text-[30px] font-[500] flex items-center"><FaFireAlt className="me-2 text-red-500" />Hot Sale</h3>
            <HotSale />
          </div>
        </div>
      </div>
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

export default ProductPage;