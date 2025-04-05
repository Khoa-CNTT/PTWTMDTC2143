import React, { useState } from "react";
import { Checkbox, Button, FormControlLabel} from "@mui/material";

const Login: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[600px] bg-white p-12 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
        <label className="font-semibold">Username</label>
        <input
          type="email"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập tên đăng nhập"
        />

        <label className="font-semibold mt-2">Password</label>
        <input
          type="email"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập mật khẩu"
        />

        <div className="flex justify-between items-center mb-5">
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
            label="Remember Me"
          />
          <p className="text-orange-500 cursor-pointer font-semibold">Forgot Password?</p>
        </div>

        <div className="mt-auto">
          <Button variant="contained" fullWidth sx={{ backgroundColor: "orange", fontSize: "16px", padding: "12px" }}>
            SIGN IN
          </Button>
        </div>
        <div className="text-center mt-4">
          <label className="me-2">Don't have an Account?</label>
              <a href="/login" className="text-orange-500 hover:underline font-semibold">
                Sign up now
              </a>
            </div>
      </div>
    </div>
  );
};

export default Login;
