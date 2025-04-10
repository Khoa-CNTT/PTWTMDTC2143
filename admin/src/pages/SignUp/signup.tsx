import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/MESSIU-logo2.png";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../context/MyContext";

import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";

const SignUp: React.FC = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("Header must be used within a MyContextProvider");
  }

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowRePassword, setIsShowRePassword] = useState<boolean>(false);

  useEffect(() => {
    context.setIsHideSidebar(true);
  }, [context]);

  return (
    <>
      <section className="section signInPage signUpPage min-h-screen">
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
              <h2 className="mb-4">Sign Up</h2>
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 pr-0 md:pr-2">
                  <div className="form-group">
                    <TextField
                      id="standard-basic"
                      label="Name"
                      type="text"
                      variant="standard"
                      autoFocus
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="w-full md:w-6/12 pl-0 md:pl-2">
                  <div className="form-group">
                    <TextField
                      id="standard-basic"
                      label="Phone No."
                      type="tel"
                      variant="standard"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  type="email"
                  variant="standard"
                  className="w-full"
                />
              </div>

              <div className="form-group relative">
                <TextField
                  id="standard-basic"
                  label="Password"
                  type={isShowPassword ? "text" : "password"}
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

              <div className="form-group relative">
                <TextField
                  id="standard-basic"
                  label="Repeat Password"
                  type={isShowRePassword ? "text" : "password"}
                  variant="standard"
                  className="w-full"
                />
                <span
                  className="toggleShowPassword absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setIsShowRePassword(!isShowRePassword)}
                >
                  {isShowRePassword ? <IoEyeSharp /> : <HiMiniEyeSlash />}
                </span>
              </div>

              <div className="flex items-center mt-4 mb-3 flex-wrap gap-3">
                <Button className="btn-blue w-full md:w-auto text-lg btn-big">
                  Sign Up
                </Button>
                <Link to="/" className="w-full md:w-auto">
                  <Button
                    variant="outlined"
                    onClick={() => context.setIsHideSidebar(false)}
                    className="w-full md:w-auto text-lg btn-big"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>

              <p className="txt">
                Already Have an Account?{" "}
                <Link className="border-effect" to="/login">
                  Sign In
                </Link>
              </p>
              <h6 className="mt-4 text-center font-bold">
                Or continue with social account
              </h6>
              <Button
                variant="outlined"
                className="loginWithGoogle mt-2 w-full"
              >
                <FcGoogle /> Sign Up With Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
