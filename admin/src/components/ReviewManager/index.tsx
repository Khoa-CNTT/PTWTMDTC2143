import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
interface Review {
  id: number;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  approved: boolean;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Cristine Easom',
    email: 'ceasomw@theguardian.com',
    avatar: 'https://i.pravatar.cc/40?img=1',
    rating: 4,
    content: 'Good service, quality product.',
    date: '2025-05-01',
    approved: true,
  },
  {
    id: 2,
    name: 'Cristine Easom',
    email: 'ceasomw@theguardian.com',
    avatar: 'https://i.pravatar.cc/40?img=1',
    rating: 3,
    content: 'Product is okay, delivery was a bit slow.',
    date: '2025-04-30',
    approved: true,
  },
  {
    id: 3,
    name: 'Cristine Easom',
    email: 'ceasomw@theguardian.com',
    avatar: 'https://i.pravatar.cc/40?img=1',
    rating: 5,
    content: 'Very satisfied, will support next time.',
    date: '2025-04-29',
    approved: true,
  },
  ...Array.from({ length: 28 }, (_, i) => ({
    id: 4 + i,
    name: `Customer ${i + 1}`,
    email: `email${i + 1}@example.com`,
    avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
    rating: parseInt((Math.random() * 5).toFixed(1)),
    content: `This is a sample review from Customer ${i + 1}.`,
    date: `2025-05-${String(i + 1).padStart(2, '0')}`,
    approved: Math.random() > 0.3,
  })),
];

const ReviewManager: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [reviewToToggle, setReviewToToggle] = useState<Review | null>(null);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setReviewToDelete(null);
  };
  const handleCancelDelete = () => {
    setReviewToDelete(null);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filtered = reviews.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Review Management</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm relative">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 px-2">CUSTOMERS</th>
                <th className="py-2 px-2">RATING</th>
                <th className="py-2 px-2">CONTENT</th>
                <th className="py-2 px-2">DATE</th>
                <th className="py-2 px-2">STATUS</th>
                <th className="py-2 px-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReviews.map((r) => (
                <tr key={r.id} className="border-b relative">
                  <td className="py-2 px-2 flex items-center gap-2">
                    <img
                      src={r.avatar}
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.email}</div>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-orange-500 font-semibold">
                    {r.rating}
                  </td>
                  <td className="py-2 px-2">{r.content}</td>
                  <td className="py-2 px-2">{r.date}</td>
                  <td className="py-2 px-2 ">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        r.approved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {r.approved ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="py-2 px-2 space-x-2">
                    <button
                      onClick={() => setReviewToToggle(r)}
                      className="text-gray-500 hover:text-blue-600"
                      title={r.approved ? 'Hide review' : 'Show review'}
                    >
                      {r.approved ? (
                        <FaRegEyeSlash size={20} />
                      ) : (
                        <FaRegEye size={20} />
                      )}
                    </button>
                    <button
                      onClick={() => setReviewToDelete(r)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedReviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <div>
            <label className="text-sm text-gray-600">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="ml-2 border rounded px-2 py-1"
            >
              {[5, 10, 15, 20].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2 items-center">
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

      {reviewToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete the review from{' '}
              <strong>{reviewToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(reviewToDelete.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {reviewToToggle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Status Change
            </h2>
            <p className="mb-4">
              Are you sure you want to{' '}
              <strong>{reviewToToggle.approved ? 'hide' : 'show'}</strong> the
              review from <strong>{reviewToToggle.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setReviewToToggle(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  setReviews((prev) =>
                    prev.map((review) =>
                      review.id === reviewToToggle.id
                        ? { ...review, approved: !review.approved }
                        : review
                    )
                  );
                  setReviewToToggle(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManager;
