import axiosInstance from './axios.config';

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  content: string;
  images: string;
  parentId: string;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  reviews: Review[];
  total: number;
  nextCursor?: string | null;
}

const reviewService = {
  async getAllReviews(limit = 10, cursor?: string): Promise<ReviewResponse> {
    const res = await axiosInstance.get('/reviews', {
      params: { limit, cursor },
    });
    return res.data;
  },

  async getReviewById(id: string): Promise<Review> {
    const res = await axiosInstance.get(`/reviews/${id}`);
    return res.data;
  },

  async hideReview(id: string, isHidden: boolean): Promise<Review> {
    const res = await axiosInstance.patch(`/reviews/${id}/hide`, { isHidden });
    return res.data;
  },

  async deleteReview(id: string): Promise<void> {
    await axiosInstance.delete(`/reviews/${id}`);
  },
};

export default reviewService;
