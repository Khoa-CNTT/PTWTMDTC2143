import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const BestDeal: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Realme C65',
      price: 200,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-realme-c65_3_.png',
      rating: 4,
    },
    {
      id: 2,
      name: 'TV Xiaomi 27inch',
      price: 150,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png',
      rating: 3,
    },
    {
      id: 3,
      name: 'PC Gaming',
      price: 137,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_167_2_5.png',
      rating: 4,
    },
    {
      id: 4,
      name: 'Apple Air 11 M3',
      price: 210,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-11-wifi-1.jpg',
      rating: 5,
    },
    {
      id: 5,
      name: 'Apple AirPods 4',
      price: 300,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-thumb.png',
      rating: 4,
    },
    {
      id: 6,
      name: 'Headphone Marshall',
      price: 290,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-chup-tai-marshall-monitor-iii-anc-thumb_1.png',
      rating: 3,
    },
    {
      id: 7,
      name: 'Huawei Fit3',
      price: 220,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/u/huawei_1__1_2.png',
      rating: 4,
    },
    {
      id: 8,
      name: 'MacBook Air M4',
      price: 400,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_11_1.png',
      rating: 5,
    },
    {
      id: 9,
      name: 'Apple Air 11 M3',
      price: 340,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-11-wifi-1.jpg',
      rating: 4,
    },
    {
      id: 10,
      name: 'iPhone 16 Pro Max',
      price: 320,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png',
      rating: 4,
    },
  ];

  return (
    <>
      <div className="bestDeal mt-5">
        <div className="grid gap-4 grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-2 border-1 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1]  overflow-hidden"
            >
              <div className="w-full h-full rounded-[20px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)] -mt-3">
                    <Link to="/product-detail" className="link transition-all">
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <div className="mt-4">
                  <h3 className="text-primary font-[500]">${product.price}</h3>
                  <Rating
                    name="size-small"
                    value={product.rating}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default BestDeal;
