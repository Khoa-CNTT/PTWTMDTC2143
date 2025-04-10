// src/context/MyContext.tsx
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

// Định nghĩa kiểu dữ liệu cho Context
interface MyContextType {
  setIsToggleSidebar: Dispatch<SetStateAction<boolean>>;
  isToggleSidebar: boolean;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isHideSidebar: boolean;
  setIsHideSidebar: Dispatch<SetStateAction<boolean>>;
  themeMode: boolean;
  setThemeMode: Dispatch<SetStateAction<boolean>>;
}

// Khởi tạo context với giá trị mặc định
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Provider chứa state và logic
export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isToggleSidebar, setIsToggleSidebar] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isHideSidebar, setIsHideSidebar] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<boolean>(() => {
    return localStorage.getItem("themeMode") !== "dark"; // Mặc định là light nếu không phải "dark"
  });

  // Lưu trạng thái theme vào localStorage
  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  // Giá trị context
  const values: MyContextType = {
    setIsToggleSidebar,
    isToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebar,
    setIsHideSidebar,
    themeMode,
    setThemeMode,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};
