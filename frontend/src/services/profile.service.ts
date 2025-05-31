import api from './api';

export interface ProfileData {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  avatar?: string;
}

export const profileService = {
  getProfile: async (): Promise<ProfileData> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<ProfileData>): Promise<ProfileData> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  updateAvatar: async (file: File): Promise<{ avatar: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.put('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
