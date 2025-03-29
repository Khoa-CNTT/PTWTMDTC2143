import React from 'react'
import ProductDetail from '../../components/ProductDetail';
import RecentlyViewed from '../../components/RecentlyViewed';

const ProductDetailPage: React.FC = () => {
  return (
    <>
      <ProductDetail/>
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

export default ProductDetailPage;