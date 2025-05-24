import api from './api';

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  // ...các trường khác nếu có
}
export const getAllBrands = async () => {
  const res = await api.get('/brands');
  return res.data;
};

export const getBrandById = async (id: string) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

export const getBrandByName = async (name: string) => {
  const res = await axios.get(`/name/${encodeURIComponent(name)}`);
  return res.data;
};

// You can add create, update, delete if needed
