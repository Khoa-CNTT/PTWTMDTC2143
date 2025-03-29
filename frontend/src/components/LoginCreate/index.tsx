import React, { useState } from "react";
import { TextField, Checkbox, Button, FormControlLabel, InputAdornment  } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
const LoginCreate: React.FC = () => {
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row gap-12 p-12 justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-[600px] bg-white p-12 rounded-lg shadow-lg flex flex-col min-h-[500px]">
                <h2 className="text-3xl font-semibold mb-4">Login</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <label className="font-semibold mb-1">Username/Email Address</label>
                <TextField
                    fullWidth
                    className="mb-4"
                    placeholder="Type your username here"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle style={{ color: "orange" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <label className="font-semibold mb-1">Password</label>
                <TextField
                    type="password"
                    fullWidth
                    className="mb-4"
                    placeholder="Type your password here"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock style={{ color: "orange" }} />
                            </InputAdornment>
                        ),
                    }}
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
            </div>

            <div className="w-full max-w-[600px] bg-white p-12 rounded-lg shadow-lg flex flex-col min-h-[500px]">
                <h2 className="text-3xl font-semibold mb-4">Create an Account</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="bg-orange-100 p-4 rounded-md mb-6 text-center text-orange-600 font-medium">
                    📢 <strong>Sign up Today</strong> and get your 40% Voucher
                </div>

                <label className="font-semibold mb-1">Email Address</label>
                <TextField
                    fullWidth
                    className="mb-4"
                    placeholder="Type your email here"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle style={{ color: "orange" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <div className="mt-auto">
                    <Button variant="contained" fullWidth sx={{ backgroundColor: "orange", fontSize: "16px", padding: "12px" }}>
                        REGISTER
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginCreate;
