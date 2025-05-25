import api from './api';

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  content?: string;
  images?: string[];
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  replies?: Review[];
  user?: {
    name: string;
    avatar?: string;
  };
}

export interface CreateReviewDTO {
  userId: string;
  productId: string;
  rating: number;
  content?: string;
  parentId?: string;
  nickname?: string;
  email?: string;
}

class ReviewService {
  async getReviewsByProduct(productId: string): Promise<Review[]> {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  }

  async createReview(
    reviewData: CreateReviewDTO,
    images?: File[]
  ): Promise<Review> {
    const formData = new FormData();

    // Append basic review data
    formData.append('userId', reviewData.userId);
    formData.append('productId', reviewData.productId);
    formData.append('rating', reviewData.rating.toString());
    if (reviewData.content) {
      formData.append('content', reviewData.content);
    }
    if (reviewData.parentId) {
      formData.append('parentId', reviewData.parentId);
    }
    if (reviewData.nickname) {
      formData.append('nickname', reviewData.nickname);
    }
    if (reviewData.email) {
      formData.append('email', reviewData.email);
    }

    // Append images if they exist
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    } else {
      formData.append('images', '[]');
    }

    const response = await api.post('/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getReviewById(id: string): Promise<Review> {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  }

  async hideReview(id: string, isHidden: boolean): Promise<Review> {
    const response = await api.patch(`/reviews/${id}/hide`, { isHidden });
    return response.data;
  }
}

export const reviewService = new ReviewService();
