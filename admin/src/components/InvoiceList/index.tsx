import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePendingActions } from 'react-icons/md';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

import { CgDanger } from 'react-icons/cg';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { TbFileInvoice } from 'react-icons/tb';

import {
  getAllInvoices,
  Invoice,
  getInvoicesByStatus,
  deleteInvoice,
} from '../../services/invoiceService';

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
    {text}
  </span>
);

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    cancelled: 0,
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, [currentPage, itemsPerPage]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllInvoices(currentPage, itemsPerPage);
      setInvoices(response.invoices);
      setTotalPages(response.totalPages);

      // Fetch stats
      const [paid, pending, cancelled] = await Promise.all([
        getInvoicesByStatus('PAID', 1, 1),
        getInvoicesByStatus('PENDING', 1, 1),
        getInvoicesByStatus('CANCELLED', 1, 1),
      ]);

      setStats({
        total: response.total,
        paid: paid.total,
        pending: pending.total,
        cancelled: cancelled.total,
      });
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (invoiceId: string) => {
    navigate(`/invoice-details/${invoiceId}`);
  };

  const handleDelete = async (invoiceId: string) => {
    try {
      await deleteInvoice(invoiceId);
      fetchInvoices(); // Refresh the list
      setShowMenu(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete invoice');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShowMenu(null);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-600';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-600';
      case 'CANCELLED':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        {[
          {
            name: 'Total Invoices',
            count: stats.total.toString(),
            color: 'from-yellow-400 to-yellow-500',
            icon: <TbFileInvoice />,
          },
          {
            name: 'Paid',
            count: stats.paid.toString(),
            color: 'from-green-500 to-green-400',
            icon: <IoCheckmarkDoneSharp />,
          },
          {
            name: 'Pending',
            count: stats.pending.toString(),
            color: 'from-fuchsia-500 to-pink-400',
            icon: <MdOutlinePendingActions />,
          },
          {
            name: 'Cancelled',
            count: stats.cancelled.toString(),
            color: 'from-blue-600 to-blue-400',
            icon: <CgDanger />,
          },
        ].map((card, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-6 rounded-lg bg-gradient-to-r ${card.color} text-white`}
          >
            <div>
              <p className="font-semibold text-sm">{card.name}</p>
              <h2 className="text-3xl font-bold">{card.count}</h2>
            </div>
            <div className="text-4xl opacity-50">{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div>Show</div>
            <select
              className="border rounded px-2 py-1"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search Invoice"
            className="border rounded px-3 py-2 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="w-full text-left text-sm relative">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">INVOICE NUMBER</th>
              <th className="py-2 px-2">TOTAL</th>
              <th className="py-2 px-2">DATE</th>
              <th className="py-2 px-2">STATUS</th>
              <th className="py-2 px-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr className="border-b relative" key={invoice.id}>
                <td className="py-2 px-2 text-blue-600">{index + 1}</td>
                <td className="py-2 px-2">{invoice.invoiceNumber}</td>
                <td className="py-2 px-2">${invoice.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-2">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-2">
                  <Badge
                    text={invoice.status}
                    color={getStatusColor(invoice.status)}
                  />
                </td>
                <td className="py-2 px-2">
                  <div className="relative inline-block text-left">
                    <button
                      className="hover:bg-gray-200 p-2 rounded-full"
                      onClick={() =>
                        setShowMenu(showMenu === index ? null : index)
                      }
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>

                    {showMenu === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-20">
                        <button
                          onClick={() => handleView(invoice.id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipPrevious />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateBefore />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateNext />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
