import React, { useEffect, useState } from 'react';
import { FaLaptop } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Category, categoryService } from '../../services/categoryService';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoryService.getRootCategoriesWithProductCount();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Không thể tải danh mục. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!categories.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Không có danh mục nào
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <FaLaptop className="text-3xl text-primary mb-2" />
              <p className="font-semibold text-gray-800">{category.name}</p>
              <p className="text-sm text-gray-600">
                {category.productCount || 0} Sản phẩm
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
