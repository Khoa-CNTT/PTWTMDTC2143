import React, { useState } from "react";
import { TextField, Checkbox, Button, FormControlLabel } from "@mui/material";


const Shipping: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState("bank");

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField label="First Name" fullWidth />
                    <TextField label="Last Name" fullWidth />
                    <TextField label="Email Address" fullWidth />
                    <TextField label="Mobile Phone Number" fullWidth />
                    <TextField label="Address" fullWidth />
                    <TextField label="Country" fullWidth />
                    <TextField label="Postcode/ZIP" fullWidth />
                    <TextField label="Town/City" fullWidth />
                </div>
                <TextField label="Note" fullWidth multiline rows={3} className="mt-4" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Add to address book" className="mt-4" />
            </div>

            <div className="w-full lg:w-[350px] bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                <div className="mb-4">
                    <div className="flex item-center justify-between">
                        <p className="font-[500] w-[10px]">1x</p>
                        <p className="text-gray-500">LED Monitor With High</p>
                        <p className="font-[500] ">$976.33</p>
                    </div>
                    <div className="flex item-center justify-between">
                        <p className="font-[500] w-[10px]">1x</p>
                        <p className="text-gray-500">Magic Pen for iPad</p>
                        <p className="font-[500]">$976.33</p>
                    </div>
                </div>
                <div className="border-t pt-4">
                    <p>Subtotal: <span className="float-right">$1,952.66</span></p>
                    <p>Shipping: <span className="float-right text-green-500">Free Shipping</span></p>
                    <p>Tax: <span className="float-right">$4.00</span></p>
                    <p className="font-bold text-lg mt-2">Order Total: <span className="float-right text-orange-500">$1,956.66</span></p>
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">Payment</h2>
                <FormControlLabel
                    control={<Checkbox checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />}
                    label="Direct Bank Transfer"
                />
                <FormControlLabel
                    control={<Checkbox checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />}
                    label="Paypal"
                />
                <FormControlLabel
                    control={<Checkbox checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />}
                    label="Cash On Delivery"
                />

                <Button variant="contained" fullWidth sx={{ backgroundColor: "orange", mt: 2 }}>
                    PLACE ORDER
                </Button>
            </div>
        </div>
    );
};

export default Shipping;
