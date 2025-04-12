// import "./index.css";
// import Header from "./components/Header/Header";
// import Dashboard from "./pages/Dashboard";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SideBar from "./components/SideBar/SideBar";
// import { createContext, useEffect, useState } from "react";
// import Login from "./pages/Login/login";
// import SignUp from "./pages/SignUp/signup";
// import ProductDetails from "./pages/ProductDetails/index";
// import Products from "./pages/Products/products";
// import { Dispatch, SetStateAction } from "react";

// // Define the context type
// interface MyContextType {
//   setIsToggleSidebar: Dispatch<SetStateAction<boolean>>;
//   isToggleSidebar: boolean;
//   isLogin: boolean;
//   setIsLogin: Dispatch<SetStateAction<boolean>>;
//   isHideSidebar: boolean;
//   setIsHideSidebar: Dispatch<SetStateAction<boolean>>;
//   themeMode: boolean;
//   setThemeMode: Dispatch<SetStateAction<boolean>>;
// }

// export const MyContext = createContext<MyContextType>({
//   setIsToggleSidebar: () => {},
//   isToggleSidebar: false,
//   isLogin: false,
//   setIsLogin: () => {},
//   isHideSidebar: false,
//   setIsHideSidebar: () => {},
//   themeMode: false,
//   setThemeMode: () => {},
// });

// function App() {
//   const [isToggleSidebar, setIsToggleSidebar] = useState<boolean>(false);
//   const [isLogin, setIsLogin] = useState<boolean>(true);
//   const [isHideSidebar, setIsHideSidebar] = useState<boolean>(false);
//   const [themeMode, setThemeMode] = useState<boolean>(() => {
//     return localStorage.getItem("themeMode") !== "dark"; // Default to light if not "dark"
//   });

//   useEffect(() => {
//     if (themeMode) {
//       document.body.classList.remove("dark");
//       document.body.classList.add("light");
//       localStorage.setItem("themeMode", "light");
//     } else {
//       document.body.classList.remove("light");
//       document.body.classList.add("dark");
//       localStorage.setItem("themeMode", "dark");
//     }
//   }, [themeMode]);

//   const values: MyContextType = {
//     setIsToggleSidebar,
//     isToggleSidebar,
//     isLogin,
//     setIsLogin,
//     isHideSidebar,
//     setIsHideSidebar,
//     themeMode,
//     setThemeMode,
//   };

//   return (
//     <BrowserRouter>
//       <MyContext.Provider value={values}>
//         {isHideSidebar !== true && <Header />}

//         <div className="main d-flex">
//           {isHideSidebar !== true && (
//             <div
//               className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}
//             >
//               <SideBar />
//             </div>
//           )}

//           <div
//             className={`content ${isHideSidebar ? "full" : ""} ${
//               isToggleSidebar ? "toggle" : ""
//             }`}
//           >
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/sign-up" element={<SignUp />} />
//               <Route path="/products" element={<Products />} />
//               <Route path="/product/details" element={<ProductDetails />} />
//             </Routes>
//           </div>
//         </div>
//       </MyContext.Provider>
//     </BrowserRouter>
//   );
// }

// export default App;

import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup";
import ProductDetails from "./pages/ProductDetails/index";
import Products from "./pages/Products/products";
import { MyContextProvider } from "./context/MyContext"; // Import Provider mới
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <MyContextProvider>
        <Header />
        <div className="main d-flex">
          <SideBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/details" element={<ProductDetails />} />
            </Routes>
          </div>
        </div>
      </MyContextProvider>
    </BrowserRouter>
  );
}

export default App;
