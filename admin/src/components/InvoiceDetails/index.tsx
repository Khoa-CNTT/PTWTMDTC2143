import React from 'react';

const InvoiceDetails = () => {
  return (
    <div className="p-6">
      <div className=" bg-white p-8 rounded-lg shadow-md text-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4"></div>
            <p>Office 149, 450 South Brand Brooklyn</p>
            <p>San Diego County, CA 91905, USA</p>
            <p>+1(123) 456 7891, +44 (876) 543 2198</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">Invoice #86423</h2>
            <p>
              Date Issued: <strong>April 25, 2021</strong>
            </p>
            <p>
              Date Due: <strong>May 25, 2021</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-1">Invoice To:</h3>
            <p>Thomas Shelby</p>
            <p>Shelby Company Limited</p>
            <p>Small Heath, B10 0HF, UK</p>
            <p>718-986-6062</p>
            <p>peakyFBlinders@gmail.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Bill To:</h3>
            <p>
              Total Due: <strong>$12,110.55</strong>
            </p>
            <p>Bank name: American Bank</p>
            <p>Country: United States</p>
            <p>IBAN: ETD95476213874685</p>
            <p>SWIFT code: BR91905</p>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ITEM</th>
                <th className="px-4 py-2">DESCRIPTION</th>
                <th className="px-4 py-2">COST</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Vuexy Admin Template</td>
                <td className="px-4 py-2">HTML Admin Template</td>
                <td className="px-4 py-2">$32</td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">$32.00</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Frest Admin Template</td>
                <td className="px-4 py-2">Angular Admin Template</td>
                <td className="px-4 py-2">$22</td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">$22.00</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Apex Admin Template</td>
                <td className="px-4 py-2">HTML Admin Template</td>
                <td className="px-4 py-2">$17</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">$34.00</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Robust Admin Template</td>
                <td className="px-4 py-2">React Admin Template</td>
                <td className="px-4 py-2">$66</td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">$66.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <p className="font-medium">
            Salesperson: <span className="font-normal">Alfie Solomons</span>
          </p>
          <p className="text-gray-500">Thanks for your business</p>
        </div>

        <div className="flex justify-end mt-6">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">$1800</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="font-medium">$28</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span className="font-medium">21%</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-lg font-semibold">
              <span>Total:</span>
              <span>$1690</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
