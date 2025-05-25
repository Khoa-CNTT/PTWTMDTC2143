import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceById, Invoice } from '../../services/invoiceService';

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) return;
      try {
        const data = await getInvoiceById(id);
        setInvoice(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch invoice'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!invoice) return <div>Invoice not found</div>;

  return (
    <div className="p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p>Office 149, 450 South Brand Brooklyn</p>
            <p>San Diego County, CA 91905, USA</p>
            <p>+1(123) 456 7891, +44 (876) 543 2198</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">
              Invoice #{invoice.invoiceNumber}
            </h2>
            <p>
              Date Issued:{' '}
              <strong>
                {new Date(invoice.createdAt).toLocaleDateString()}
              </strong>
            </p>
            <p>
              Status: <strong>{invoice.status}</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-1">Invoice To:</h3>
            <p>User ID: {invoice.userId}</p>
            <p>Transaction ID: {invoice.transactionId}</p>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">PRODUCT</th>
                <th className="px-4 py-2">COST</th>
                <th className="px-4 py-2">QTY</th>
                <th className="px-4 py-2">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{item.description}</div>
                      <div className="text-xs text-gray-500">
                        {item.variant}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.cost.toFixed(2)}$</td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">{item.price.toFixed(2)}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">
                {invoice.items
                  .reduce((sum, item) => sum + item.price, 0)
                  .toFixed(2)}
                $
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 text-lg font-semibold">
              <span>Total:</span>
              <span>{invoice.totalAmount.toFixed(2)}$</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium">Thanks for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
