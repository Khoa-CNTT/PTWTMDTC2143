import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import reviewService, { Review } from '../../services/reviewService';

const ReviewManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await reviewService.getAllReviews();
      setReviews(res.reviews);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setError('Failed to fetch reviews');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleVisibility = async (review: Review) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedReview = await reviewService.hideReview(
        review.id,
        !review.isHidden
      );
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? updatedReview : r))
      );
    } catch (err) {
      console.error('Failed to toggle review status:', err);
      setError('Failed to update review status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await reviewService.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setReviewToDelete(null);
    } catch (err) {
      console.error('Failed to delete review:', err);
      setError('Failed to delete review');
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = reviews.filter(
    (r) =>
      r.userId.toLowerCase().includes(search.toLowerCase()) ||
      r.content.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Review Management</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by user ID or content..."
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : paginatedReviews.length > 0 ? (
                paginatedReviews.map((r) => (
                  <tr key={r.id} className="border-b relative">
                    <td className="py-2 px-2 flex items-center gap-2">
                      <img
                        src={r.images}
                        className="w-8 h-8 rounded-full"
                        alt=""
                      />
                      <div>
                        <div className="font-medium">{r.userId}</div>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-orange-500 font-semibold">
                      {r.rating}
                    </td>
                    <td className="py-2 px-2">{r.content}</td>
                    <td className="py-2 px-2">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2 ">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          !r.isHidden
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {!r.isHidden ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-2 px-2 space-x-2">
                      <button
                        onClick={() => handleToggleVisibility(r)}
                        className="text-gray-500 hover:text-blue-600"
                        title={!r.isHidden ? 'Hide review' : 'Show review'}
                        disabled={isLoading}
                      >
                        {!r.isHidden ? (
                          <FaRegEyeSlash size={20} />
                        ) : (
                          <FaRegEye size={20} />
                        )}
                      </button>
                      <button
                        onClick={() => setReviewToDelete(r)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                        disabled={isLoading}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
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
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="ml-2 border rounded px-2 py-1"
              disabled={isLoading}
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
              disabled={currentPage === 1 || isLoading}
              className="text-gray-400 disabled:opacity-30"
            >
              <MdSkipPrevious />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="text-gray-400 disabled:opacity-30"
            >
              <MdOutlineNavigateBefore />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                disabled={isLoading}
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
              disabled={currentPage === totalPages || isLoading}
              className="text-gray-400 disabled:opacity-30"
            >
              <MdOutlineNavigateNext />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || isLoading}
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
              <strong>{reviewToDelete.userId}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setReviewToDelete(null)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(reviewToDelete.id)}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManager;
