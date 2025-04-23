import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePendingActions } from 'react-icons/md';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { RiRefundFill } from 'react-icons/ri';
import { CgDanger } from 'react-icons/cg';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { TbFileInvoice } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
const allInvoice = [
  {
    id: '#6979',
    date: 'Apr 15, 2023, 10:21',
    name: 'Cristine Easom',
    email: 'ceasomw@theguardian.com',
    blance: 'Paid',
    total: '$ 1,000',
    blanceColor: 'bg-green-100 text-green-600',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: '#6624',
    date: 'Apr 17, 2023, 6:43',
    name: 'Fayre Screech',
    email: 'fscreechs@army.mil',
    blance: 'Paid',
    total: '$ 1,000',
    blanceColor: 'bg-green-100 text-green-600',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  //test du lieu
  ...Array.from({ length: 28 }, (_, i) => ({
    id: `#6${700 + i}`,
    date: `Apr ${10 + i}, 2023`,
    name: `Customer ${i + 1}`,
    email: `email${i + 1}@example.com`,
    blance: i % 3 === 0 ? 'Paid' : `-$ ${(i + 1) * 27.5}`,
    total: `$ ${(i + 1) * 100}`,
    blanceColor: i % 3 === 0 ? 'bg-green-100 text-green-600' : '',
    avatar: `https://i.pravatar.cc/40?img=${i + 3}`,
  })),
];

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
    {text}
  </span>
);

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState(allInvoice);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (invoiceId: string) => {
    navigate(`/invoice-details`);
  };

  const handleDelete = (invoiceId: string) => {
    const updatedInvoices = invoices.filter(
      (invoice) => invoice.id !== invoiceId
    );
    setInvoices(updatedInvoices);

    if (updatedInvoices.length % itemsPerPage === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    setShowMenu(null);
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
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        {[
          {
            name: 'Customers',
            count: '12',
            color: 'from-yellow-400 to-yellow-500',
            icon: <FaRegUser />,
          },
          {
            name: 'Invoices',
            count: '30',
            color: 'from-green-500 to-green-400',
            icon: <TbFileInvoice />,
          },
          {
            name: 'Paid',
            count: '9',
            color: 'from-fuchsia-500 to-pink-400',
            icon: <IoCheckmarkDoneSharp />,
          },
          {
            name: 'Unpaid',
            count: '1',
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
            placeholder="Search Order"
            className="border rounded px-3 py-2 w-64"
          />
        </div>

        <table className="w-full text-left text-sm relative">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">CUSTOMERS</th>
              <th className="py-2 px-2">TOTAL</th>
              <th className="py-2 px-2">DATE</th>
              <th className="py-2 px-2">STATUS</th>
              <th className="py-2 px-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((invoice, index) => (
              <tr className="border-b relative" key={index}>
                <td className="py-2 px-2 text-blue-600">{invoice.id}</td>
                <td className="py-2 px-2 flex items-center gap-2">
                  <img
                    src={invoice.avatar}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <div>
                    <div className="font-medium">{invoice.name}</div>
                    <div className="text-xs text-gray-500">{invoice.email}</div>
                  </div>
                </td>
                <td className="py-2 px-2">{invoice.total}</td>
                <td className="py-2 px-2">{invoice.date}</td>
                <td className={`py-2 px-2`}>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${invoice.blanceColor}`}
                  >
                    {invoice.blance}
                  </span>
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
