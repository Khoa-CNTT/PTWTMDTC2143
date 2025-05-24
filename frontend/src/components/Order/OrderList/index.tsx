import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const formatCurrencyUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 23000);
  };
  interface Product {
    name: string;
    imageUrl: string;
  }

  interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
  }
  type ReturnRequest = {
    orderItemIds: number[];
    reason: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);

  type DeliveryMethod = 'HOME_DELIVERY' | 'STORE_PICKUP';

  type OrderStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'RETURNED'
    | 'CANCELLED';

  interface Order {
    id: number;
    orderDate: string;
    deliveryMethod: DeliveryMethod;
    orderStatus: OrderStatus;
    totalAmount: number;
    orderItems: OrderItem[];
  }

  interface OrdersData {
    data: Order[];
  }
  const [orders] = useState<OrdersData>({
    data: [
      {
        id: 1,
        orderDate: '2025-06-01',
        deliveryMethod: 'HOME_DELIVERY',
        orderStatus: 'DELIVERED',
        totalAmount: 700000,
        orderItems: [
          {
            id: 1,
            product: {
              name: 'Product A',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 1,
            price: 500000,
          },
          {
            id: 8,
            product: {
              name: 'Product B',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 1,
            price: 200000,
          },
        ],
      },
      {
        id: 7,
        orderDate: '2025-06-01',
        deliveryMethod: 'HOME_DELIVERY',
        orderStatus: 'DELIVERED',
        totalAmount: 500000,
        orderItems: [
          {
            id: 7,
            product: {
              name: 'Product ZZ',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 3,
            price: 500000,
          },
        ],
      },
      {
        id: 2,
        orderDate: '2025-06-02',
        deliveryMethod: 'HOME_DELIVERY',
        orderStatus: 'PENDING',
        totalAmount: 200000,
        orderItems: [
          {
            id: 2,
            product: {
              name: 'Product B',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 2,
            price: 100000,
          },
        ],
      },
      {
        id: 3,
        orderDate: '2025-06-03',
        deliveryMethod: 'STORE_PICKUP',
        orderStatus: 'PROCESSING',
        totalAmount: 300000,
        orderItems: [
          {
            id: 3,
            product: {
              name: 'Product C',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 1,
            price: 300000,
          },
        ],
      },
      {
        id: 4,
        orderDate: '2025-06-04',
        deliveryMethod: 'HOME_DELIVERY',
        orderStatus: 'SHIPPED',
        totalAmount: 150000,
        orderItems: [
          {
            id: 4,
            product: {
              name: 'Product D',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 3,
            price: 50000,
          },
        ],
      },
      {
        id: 5,
        orderDate: '2025-06-05',
        deliveryMethod: 'HOME_DELIVERY',
        orderStatus: 'RETURNED',
        totalAmount: 400000,
        orderItems: [
          {
            id: 5,
            product: {
              name: 'Product E',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 2,
            price: 200000,
          },
        ],
      },
      {
        id: 6,
        orderDate: '2025-06-06',
        deliveryMethod: 'STORE_PICKUP',
        orderStatus: 'CANCELLED',
        totalAmount: 100000,
        orderItems: [
          {
            id: 6,
            product: {
              name: 'Product F',
              imageUrl: 'https://via.placeholder.com/150',
            },
            quantity: 1,
            price: 100000,
          },
        ],
      },
    ],
  });

  const [returnFormVisible, setReturnFormVisible] = useState(false);
  const [returnOrderItems, setReturnOrderItems] = useState<OrderItem[]>([]);
  const [selectedReturnItems, setSelectedReturnItems] = useState<number[]>([]);
  const handleReturnOrder = (orderItems: OrderItem[]) => {
    setReturnOrderItems(orderItems);
    setSelectedReturnItems([]);
    setReturnReason('');
    setReturnFormVisible(true);
  };
  const [returnReason, setReturnReason] = useState('');

  const statusMap: Record<number, OrderStatus> = {
    0: 'PENDING',
    1: 'PROCESSING',
    2: 'SHIPPED',
    3: 'DELIVERED',
    4: 'RETURNED',
    5: 'CANCELLED',
  };
  const filteredOrders = useMemo(() => {
    const currentStatus = statusMap[activeTab];
    return (
      orders?.data?.filter(
        (order: Order) => order.orderStatus === currentStatus
      ) || []
    );
  }, [orders, activeTab, statusMap]);

  return (
    <div>
      <div className="ps-[50px] pe-[50px] pt-[20px] pb-[20px] bg-gray-100">
        <div className="flex-1">
          <div>
            <div className="p-4 md:mb-4 bg-white rounded-lg border border-[#e5e7eb]">
              <h3 className="font-[500] text-[24px] ">My Orders</h3>
            </div>
            <nav className="bg-white mb-2 rounded-t-md border-b border-[#e5e7eb]">
              <ul className="container flex w-auto px-0 font-[500] text-[14px] leading-6 text-[#6b7280] overflow-x-auto">
                <li
                  className={`${
                    activeTab === 0
                      ? 'font-[500] border-b-[#dc2626] text-[#dc2626] text-[14px] leading-6'
                      : 'font-[400]'
                  } border-b-2 p-3 cursor-pointer min-w-[144px] text-center hover:font-[500] duration-300 hover:border-b-[#dc2626] hover:text-[#dc2626] hover:text-[14px] hover:leading-6`}
                  onClick={() => setActiveTab(0)}
                >
                  Pending Confirmation
                </li>

                <li
                  className={`${
                    activeTab === 1
                      ? 'font-[500] border-b-[#dc2626] text-[#dc2626] text-[14px] leading-6'
                      : 'font-[400]'
                  } border-b-2 p-3 cursor-pointer min-w-[144px] text-center hover:font-[500] duration-300 hover:border-b-[#dc2626] hover:text-[#dc2626] hover:text-[14px] hover:leading-6`}
                  onClick={() => setActiveTab(1)}
                >
                  Awaiting Pickup
                </li>

                <li
                  className={`${
                    activeTab === 2
                      ? 'font-[500] border-b-[#dc2626] text-[#dc2626] text-[14px] leading-6'
                      : 'font-[400]'
                  } border-b-2 p-3 cursor-pointer min-w-[144px] text-center hover:font-[500] duration-300 hover:border-b-[#dc2626] hover:text-[#dc2626] hover:text-[14px] hover:leading-6`}
                  onClick={() => setActiveTab(2)}
                >
                  In Delivery
                </li>

                <li
                  className={`${
                    activeTab === 3
                      ? 'font-[500] border-b-[#dc2626] text-[#dc2626] text-[14px] leading-6'
                      : 'font-[400]'
                  } border-b-2 p-3 cursor-pointer min-w-[144px] text-center hover:font-[500] duration-300 hover:border-b-[#dc2626] hover:text-[#dc2626] hover:text-[14px] hover:leading-6`}
                  onClick={() => setActiveTab(3)}
                >
                  Delivered
                </li>

                <li
                  className={`${
                    activeTab === 4
                      ? 'font-[500] border-b-[#dc2626] text-[#dc2626] text-[14px] leading-6'
                      : 'font-[400]'
                  } border-b-2 p-3 cursor-pointer min-w-[144px] text-center hover:font-[500] duration-300 hover:border-b-[#dc2626] hover:text-[#dc2626] hover:text-[14px] hover:leading-6`}
                  onClick={() => setActiveTab(4)}
                >
                  Returned
                </li>

                <li
                  className={`${
                    activeTab === 5
                      ? 'font-[500] border-b-[#dc2626] text-[#dc2626] text-[14px] leading-6'
                      : 'font-[400]'
                  } border-b-2 p-3 cursor-pointer min-w-[144px] text-center hover:font-[500] duration-300 hover:border-b-[#dc2626] hover:text-[#dc2626] hover:text-[14px] hover:leading-6`}
                  onClick={() => setActiveTab(5)}
                >
                  Cancelled
                </li>
              </ul>
            </nav>

            <div className="min-h-full">
              {orders && orders.data && orders.data.length === 0 && (
                <div className="flex w-full flex-col items-center gap-4 py-6 xl:mt-4 xl:gap-5 xl:py-5">
                  <div className="flex flex-col items-center">
                    <div className="relative h-[168px] w-[300px] md:h-[168px] md:w-[300px]">
                      <img
                        sizes="100w"
                        className="inset-0 h-full w-full text-transparent"
                        src="https://fptshop.com.vn/img/empty_state.png?w=640&q=100"
                        alt="Empty cart"
                      />
                    </div>
                    <h6 className="mb-2 font-[500] text-[#090d14]">
                      You haven&apos;t placed any orders yet
                    </h6>
                    <p className="text-center font-[400] text-[14px] leading-6">
                      Discover thousands of products at Rocker now!
                    </p>
                  </div>
                </div>
              )}

              {orders && orders.data && orders.data.length > 0 && (
                <ul className="flex w-full flex-col gap-2 xl:gap-3">
                  {filteredOrders.map((order: Order) => {
                    const uniqueProductsCount = order.orderItems.length;
                    return (
                      <li key={order.id}>
                        <div className="rounded-md bg-white">
                          <div className="flex items-center justify-between px-4 py-3 xl:border-b xl:border-[#e5e7eb]">
                            <div className="flex flex-col md:flex-row items-center gap-1 xl:gap-2">
                              <h6 className="font-semibold justify-start w-full md:w-auto text-sm leading-5">
                                {new Date(order.orderDate).toLocaleDateString(
                                  'en-GB'
                                )}
                              </h6>
                              <div className="flex justify-between items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-[#e5e7eb]"></span>
                                <span>
                                  {order.deliveryMethod === 'HOME_DELIVERY'
                                    ? 'Home Delivery'
                                    : 'Store Pickup'}
                                </span>
                                <span className="h-1 w-1 rounded-full bg-[#e5e7eb] "></span>
                                <span>{uniqueProductsCount} items</span>
                              </div>
                            </div>
                            <p className="flex items-center gap-1.5 text-sm leading-5">
                              {order.orderStatus === 'CANCELLED' ? (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                                  <span className="text-red-600">
                                    Cancelled
                                  </span>
                                </>
                              ) : order.orderStatus === 'DELIVERED' ? (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                  <span className="text-green-600">
                                    Delivered
                                  </span>
                                </>
                              ) : order.orderStatus === 'SHIPPED' ? (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                                  <span className="text-blue-600">
                                    Shipping
                                  </span>
                                </>
                              ) : order.orderStatus === 'PROCESSING' ? (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-orange-600"></span>
                                  <span className="text-orange-600">
                                    Waiting for Pickup
                                  </span>
                                </>
                              ) : order.orderStatus === 'RETURNED' ? (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                                  <span className="text-purple-600">
                                    Returned
                                  </span>
                                </>
                              ) : order.orderStatus === 'PENDING' ? (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
                                  <span className="text-yellow-600">
                                    Pending Confirmation
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-gray-600"></span>
                                  <span className="text-gray-600">Unknown</span>
                                </>
                              )}
                            </p>
                          </div>

                          <ul>
                            {order.orderItems.map((item: OrderItem) => (
                              <li key={item.id} className="px-4 py-3">
                                <div className="flex gap-2 items-center xl:gap-3">
                                  <div className="flex h-14 w-14 min-w-14 cursor-pointer rounded border p-1.5 xl:h-16 xl:w-16 xl:min-w-16">
                                    <img
                                      alt={item.product.name}
                                      loading="lazy"
                                      width={50}
                                      height={50}
                                      decoding="async"
                                      data-nimg="1"
                                      className="object-contain"
                                      src={item.product.imageUrl}
                                      style={{ color: 'transparent' }}
                                    />
                                  </div>
                                  <div className="flex flex-col items-center justify-between w-full xl:flex-row xl:w-[calc(100%-76px)]">
                                    <div className="flex flex-col justify-between  w-full">
                                      <h6 className="cursor-pointer text-[#090d14] text-xs font-medium leading-[18px] xl:text-sm xl:leading-6 ">
                                        {item.product.name}
                                      </h6>
                                      <span className="text-[#090d14] text-xs font-medium leading-[18px] xl:text-sm xl:leading-6 ">
                                        Quantity: {item.quantity}
                                      </span>
                                    </div>
                                    <div className="flex w-full md:flex-row justify-end items-center gap-1 text-right">
                                      <h6 className="text-[#090d14] text-xs font-medium leading-[18px] xl:text-sm xl:leading-6 sm:order-2">
                                        {formatCurrencyUSD(item.price)}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-center justify-between px-4 pb-3">
                            <Link
                              to={`/track-order`}
                              className="text-[#1250dc] text-sm font-medium leading-5 flex items-center"
                            >
                              <span className="">View Details</span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 -rotate-90"
                              >
                                <path
                                  d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z"
                                  fill="#1250DC"
                                ></path>
                              </svg>
                            </Link>

                            <div className="flex flex-col">
                              <div>
                                <span className="mr-2 text-[14px] leading-5 text-[#6b7280]">
                                  Total Amount:
                                </span>
                                <span className="text-sm font-medium text-[#dc2626]">
                                  {formatCurrencyUSD(order.totalAmount)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-1 border-t px-4 py-3 border-[#e5e7eb]">
                            <span className="flex-1 sm:text-[14px] sm:leading-5 sm:font-[400] text-[12px] leading-[18px] text-[#6b7280]">
                              Need help? Contact us now.
                            </span>
                            <div className="flex items-center gap-2">
                              {order.orderStatus === 'DELIVERED' && (
                                <div className="px-4 py-3">
                                  <button
                                    onClick={() =>
                                      handleReturnOrder(order.orderItems)
                                    }
                                    className="flex items-center justify-center rounded-full font-medium py-2 px-3 text-base leading-6 text-black relative transition-all duration-300 ease-in-out hover:bg-blue-200 border border-gray-400"
                                  >
                                    Request Return
                                  </button>
                                </div>
                              )}
                              <button className="flex items-center justify-center rounded-full font-medium py-2 bg-[#dc2626] hover:bg-[#b91c1c] px-3 text-base leading-6 text-white relative transition-all duration-300 ease-in-out">
                                <a href="/">Support</a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {returnFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[9999]">
          <div className="bg-white rounded p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Return Request</h3>

            <p className="mb-2 text-sm text-gray-700">
              Select products you want to return:
            </p>
            <div className="space-y-3 mb-4">
              {returnOrderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 border p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.imageUrl}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Price: {formatCurrencyUSD(item.price)} | Quantity:{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedReturnItems.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReturnItems((prev) => [...prev, item.id]);
                      } else {
                        setSelectedReturnItems((prev) =>
                          prev.filter((id) => id !== item.id)
                        );
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason for Return
            </label>
            <textarea
              id="reason"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows={3}
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="Enter your reason for return..."
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                onClick={() => setReturnFormVisible(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={() => {
                  if (
                    returnReason.trim() !== '' &&
                    selectedReturnItems.length > 0
                  ) {
                    setReturnRequests((prev) => [
                      ...prev,
                      {
                        orderItemIds: selectedReturnItems,
                        reason: returnReason.trim(),
                      },
                    ]);
                    setReturnFormVisible(false);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
