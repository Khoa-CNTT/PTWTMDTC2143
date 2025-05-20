import React, { useEffect, useState } from 'react';
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
import { orderService, Order } from '../../services/orderServices';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
    {text}
  </span>
);

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message || 'Lỗi khi tải đơn hàng';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (orderId: string) => {
    navigate(`/order-details/${orderId}`);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-600';
    if (status === 'Processing') return 'bg-yellow-100 text-yellow-600';
    if (status === 'Refunded') return 'bg-pink-100 text-pink-600';
    if (status === 'Failed') return 'bg-blue-100 text-blue-600';
    return 'bg-gray-200 text-gray-600';
  };

  const getPaymentColor = (payment: string) => {
    if (payment === 'Completed') return 'text-green-500';
    if (payment === 'Pending') return 'text-orange-500';
    if (payment === 'Failed') return 'text-red-500';
    return 'text-gray-500';
  };

  const handleDelete = async (orderId: string) => {
    try {
      await orderService.deleteOrder(orderId);
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      if (updatedOrders.length % itemsPerPage === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setShowMenu(null);
      toast.success('Đã xóa đơn hàng');
    } catch (err) {
      toast.error('Lỗi khi xóa đơn hàng');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShowMenu(null);
  };

  const handleSaveStatus = async () => {
    if (!orderToEdit) return;
    try {
      await orderService.updateStatus(orderToEdit.id, {
        status: orderToEdit.status,
        payment: orderToEdit.payment,
      });
      setOrders((orders) =>
        orders.map((o) =>
          o.id === orderToEdit.id
            ? {
                ...o,
                status: orderToEdit.status,
                payment: orderToEdit.payment,
                statusColor: getStatusColor(orderToEdit.status),
                paymentColor: getPaymentColor(orderToEdit.payment),
              }
            : o
        )
      );
      toast.success('Cập nhật trạng thái thành công');
    } catch (err) {
      toast.error('Lỗi khi cập nhật trạng thái');
    } finally {
      setOrderToEdit(null);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-4 mb-5">
        <h2 className="text-xl font-semibold mb-3">Order List</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        {[
          {
            name: 'Pending Payment',
            count: orders
              .filter((o) => o.payment === 'Pending')
              .length.toString(),
            color: 'from-yellow-400 to-yellow-500',
            icon: <MdOutlinePendingActions />,
          },
          {
            name: 'Completed',
            count: orders
              .filter((o) => o.status === 'Delivered')
              .length.toString(),
            color: 'from-green-500 to-green-400',
            icon: <IoCheckmarkDoneSharp />,
          },
          {
            name: 'Refunded',
            count: orders
              .filter((o) => o.status === 'Refunded')
              .length.toString(),
            color: 'from-fuchsia-500 to-pink-400',
            icon: <RiRefundFill />,
          },
          {
            name: 'Failed',
            count: orders
              .filter((o) => o.status === 'Failed')
              .length.toString(),
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
          <input
            type="text"
            placeholder="Search Order"
            className="border rounded px-3 py-2 w-64"
          />
          <div className="flex items-center gap-2">
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <button className="border rounded px-3 py-1 text-sm bg-gray-100">
              Export
            </button>
          </div>
        </div>
        {loading ? (
          <div>Đang tải đơn hàng...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="w-full text-left text-sm relative">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-2">ORDER</th>
                <th className="py-2 px-2">CUSTOMER</th>
                <th className="py-2 px-2">PHONE</th>
                <th className="py-2 px-2">ADDRESS</th>
                <th className="py-2 px-2">PAYMENT</th>
                <th className="py-2 px-2">STATUS</th>
                <th className="py-2 px-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr className="border-b relative" key={order.id}>
                  <td className="py-2 px-2 text-blue-600">{order.id}</td>
                  <td className="py-2 px-2">{order.fullName}</td>
                  <td className="py-2 px-2">{order.phone}</td>
                  <td className="py-2 px-2">
                    {order.streetAddress}, {order.ward}, {order.district},{' '}
                    {order.city}, {order.province}, {order.country}
                  </td>
                  <td className={`py-2 px-2 ${getPaymentColor(order.payment)}`}>
                    {order.payment}
                  </td>
                  <td className="py-2 px-2">
                    <Badge
                      text={order.status}
                      color={getStatusColor(order.status)}
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
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowMenu(null)}
                            tabIndex={-1}
                          />
                          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-20">
                            <button
                              onClick={() => {
                                handleView(order.id);
                                setShowMenu(null);
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                setOrderToEdit(order);
                                setShowMenu(null);
                              }}
                              className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left"
                            >
                              Change Status
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(order.id);
                                setShowMenu(null);
                              }}
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
      {orderToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
            <h3 className="text-lg font-semibold mb-4">Edit Order Status</h3>
            <div className="mb-3">
              <label className="block text-sm mb-1">Status</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={orderToEdit.status}
                onChange={(e) =>
                  setOrderToEdit({ ...orderToEdit, status: e.target.value })
                }
              >
                <option value="Delivered">Delivered</option>
                <option value="Processing">Processing</option>
                <option value="Refunded">Refunded</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Payment</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={orderToEdit.payment}
                onChange={(e) =>
                  setOrderToEdit({ ...orderToEdit, payment: e.target.value })
                }
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setOrderToEdit(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleSaveStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
