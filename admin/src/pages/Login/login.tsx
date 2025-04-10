import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/MESSIU-logo2.png";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../context/MyContext";

import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";

const Login: React.FC = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("Header must be used within a MyContextProvider");
  }

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  useEffect(() => {
    context.setIsHideSidebar(true);
  }, [context]);

  return (
    <>
      <section className="section signInPage min-h-screen">
        <div className="shape-bottom">
          <svg
            fill="#fff"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1921 819.8"
          >
            <path
              className="st0"
              d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
            ></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="box shadow border-0 p-3">
            <div className="text-center">
              <img alt="Logo of website" src={Logo} />
            </div>
            <form className="mt-3">
              <h2 className="mb-4">Sign In</h2>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  required
                  variant="standard"
                  className="w-full"
                  autoFocus
                />
              </div>

              <div className="form-group relative">
                <TextField
                  id="standard-basic"
                  label="Password"
                  type={isShowPassword ? "text" : "password"}
                  required
                  variant="standard"
                  className="w-full"
                />
                <span
                  className="toggleShowPassword absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <IoEyeSharp /> : <HiMiniEyeSlash />}
                </span>
              </div>

              <Link
                to="/"
                className="border-effect cursor txt inline-block mt-2"
              >
                Forgot Password?
              </Link>

              <div className="flex items-center mt-3 mb-3 space-x-3">
                <Button className="btn-blue w-full text-lg btn-big">
                  Sign In
                </Button>
                <Link to="/">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      context.setIsHideSidebar(false);
                    }}
                    className="w-full text-lg btn-big"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
              <p className="txt">
                Not Registered?{" "}
                <Link className="border-effect" to="/sign-up">
                  Sign Up
                </Link>
              </p>
              <h6 className="mt-4 text-center font-bold">
                Or continue with social account
              </h6>
              <Button
                variant="outlined"
                className="loginWithGoogle mt-2 w-full"
              >
                <FcGoogle />
                &nbsp;Sign Up With Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
