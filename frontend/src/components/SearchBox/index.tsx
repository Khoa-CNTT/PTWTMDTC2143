import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Button from '@mui/material/Button';
import "./index.css";
const SearchBox: React.FC = () => {
  return (
    <div className='searchBox w-[50%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2 ml-auto'>
      <input type='text' placeholder='Search for products...' className='w-full h-full bg-transparent outline-none border-none ml-2' />
      <Button className='searchBtn !absolute right-[1px] top-1.5 z-50 !min-w-[40px] h-[40px] !w-[40px] !rounded-full !text-black'>
        <IoSearchSharp className='text-[#4e4e4e] text-[22px]' />
      </Button>
    </div>
  )
}

export default SearchBox;