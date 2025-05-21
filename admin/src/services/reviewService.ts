import axiosInstance from './axios.config';

export interface Review {
  id: number;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  approved: boolean;
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

  async getReviewById(id: number): Promise<Review> {
    const res = await axiosInstance.get(`/reviews/${id}`);
    return res.data;
  },

  async hideReview(id: number, approved: boolean): Promise<Review> {
    const res = await axiosInstance.patch(`/reviews/${id}/hide`, { approved });
    return res.data;
  },

  async deleteReview(id: number): Promise<void> {
    await axiosInstance.delete(`/reviews/${id}`);
  },
};

export default reviewService;
