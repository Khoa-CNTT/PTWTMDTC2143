import React from "react";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";

const products = [
  {
    id: 1,
    name: "Mouse Hypework",
    price: 50,
    sku: "12314124124",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/h/chuot-blue-tooth-hyperwork-1.png",
    selected: false,
  },
  {
    id: 2,
    name: "Samsung Galaxy Z Flip6",
    price: 1019,
    sku: "12314124124",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_166_3.png",
    selected: true,
  },
  {
    id: 3,
    name: "iPhone 15 128GB",
    price: 719,
    sku: "12314124124",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png",
    selected: true,
  },
];
const Shopping: React.FC = () => {
  return(
    <>
     <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center">
            <Checkbox /> <span>Select All</span>
          </div>
          <div>
            <Button color="warning">UPDATE CART</Button>
            <Button color="error">REMOVE</Button>
          </div>
        </div>
        
        {products.map((product) => (
          <div key={product.id} className="flex items-center border-b p-4">
            <Checkbox defaultChecked={product.selected} color="warning" />
            <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg" />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-orange-500 font-bold">${product.price}</p>
              <p className="text-sm text-gray-500">SKU {product.sku}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outlined">-</Button>
              <span className="px-3">1</span>
              <Button variant="outlined">+</Button>
              <IconButton>
                <Delete color="error" />
              </IconButton>
              <IconButton>
                <FavoriteBorder className="text-orange-500" />
              </IconButton>
            </div>
          </div>
        ))}

        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Shopping Summary</h2>
          <div className="flex justify-between text-xl font-bold my-2">
            <span>Total</span>
            <span className="text-orange-500">$1,952</span>
          </div>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "orange", color: "white", "&:hover": { backgroundColor: "darkorange" } }}
          >
            CHECKOUT
          </Button>
          <p className="text-center mt-2 text-sm text-gray-500">Back to Shopping</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Shopping;
 
