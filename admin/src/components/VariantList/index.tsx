import React, { useState, useEffect } from 'react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { Pencil, Trash2 } from 'lucide-react';
import { variantService, Variant } from '../../services/variantService';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VariantList: React.FC = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [editData, setEditData] = useState<Variant | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchVariants();
  }, [currentPage, pageSize]);

  const fetchVariants = async () => {
    try {
      setIsLoading(true);
      const response = await variantService.getAllVariants(
        currentPage,
        pageSize
      );
      setVariants(response.variants);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching variants:', error);
      toast.error('Lỗi khi tải danh sách biến thể');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      await variantService.deleteVariant(id);
      toast.success('Xóa biến thể thành công');
      fetchVariants();
    } catch (error) {
      console.error('Error deleting variant:', error);
      toast.error('Lỗi khi xóa biến thể');
    } finally {
      setDeleteId(null);
    }
  };

  const handleEditSave = async () => {
    if (!editData) return;
    try {
      const formData = new FormData();
      formData.append('price', editData.price.toString());
      if (editData.compareAtPrice) {
        formData.append('compareAtPrice', editData.compareAtPrice.toString());
      }
      formData.append('status', editData.status);
      formData.append('optionValues', JSON.stringify(editData.attributes));

      await variantService.updateVariant(editData.id, formData);
      toast.success('Cập nhật biến thể thành công');
      fetchVariants();
      setEditData(null);
    } catch (error) {
      console.error('Error updating variant:', error);
      toast.error('Lỗi khi cập nhật biến thể');
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h1 className="text-2xl font-semibold mb-4">Danh sách biến thể</h1>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm biến thể"
            className="border rounded px-3 py-2 w-64"
          />
          <div className="flex items-center gap-2">
            <select
              className="border rounded px-2 py-1"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <button className="border rounded px-3 py-1 text-sm bg-gray-100">
              Xuất
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm relative">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-2">ID</th>
              <th className="py-2 px-2">Hình ảnh</th>
              <th className="py-2 px-2">Sản phẩm</th>
              <th className="py-2 px-2">Giá</th>
              <th className="py-2 px-2">Giá so sánh</th>
              <th className="py-2 px-2">Thuộc tính</th>
              <th className="py-2 px-2 text-center">Trạng thái</th>
              <th className="py-2 px-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Đang tải...
                </td>
              </tr>
            ) : variants.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Không tìm thấy biến thể nào
                </td>
              </tr>
            ) : (
              variants.map((variant) => (
                <tr key={variant.id} className="border-b">
                  <td className="px-4 py-2">{variant.id}</td>
                  <td className="px-4 py-2">
                    {variant.images?.[0] && (
                      <img
                        src={variant.images[0].imageUrl}
                        alt="Variant thumbnail"
                        className="w-10 h-10 object-cover rounded border"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">Product {variant.productId}</td>
                  <td className="px-4 py-2">
                    {variant.price.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="px-4 py-2">
                    {variant.compareAtPrice
                      ? variant.compareAtPrice.toLocaleString('vi-VN') + 'đ'
                      : '-'}
                  </td>
                  <td className="px-4 py-2">
                    {variant.attributes && variant.attributes.length > 0 ? (
                      variant.attributes.map((attr, idx) => (
                        <div key={idx}>
                          <span className="font-medium">{attr.attribute}</span>:{' '}
                          {attr.value}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        variant.status === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : variant.status === 'Outofstock'
                            ? 'bg-yellow-100 text-yellow-700'
                            : variant.status === 'Discontinued'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {variant.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-blue-600 font-semibold cursor-pointer flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setEditData(variant)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => setDeleteId(variant.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
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

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
            <div className="mb-4 text-center">
              <p>Bạn có chắc chắn muốn xóa biến thể này?</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setDeleteId(null)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={() => handleDelete(deleteId)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-lg bg-white rounded shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa biến thể</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Giá</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-2 w-full"
                  value={editData.price}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      setEditData({ ...editData, price: value });
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Giá so sánh</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-2 w-full"
                  value={editData.compareAtPrice || ''}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      setEditData({ ...editData, compareAtPrice: value });
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Trạng thái</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                >
                  <option value="Available">Còn hàng</option>
                  <option value="Outofstock">Hết hàng</option>
                  <option value="Discontinued">Ngừng kinh doanh</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditData(null)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default VariantList;
