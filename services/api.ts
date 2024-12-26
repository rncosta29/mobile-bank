import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.15.15:8765/API-BANK/api/v1', // Substitua pelo URL da sua API
});

export const getAllBills = async () => {
  try {
    const response = await api.get('/bills');
    //console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    //console.error('Error fetching data:', error);
    return null;  // Em caso de erro, retorne null ou um valor padrão.
  }
};

export const getAllCreditCards = async () => {
  try {
    const response = await api.get('/credit-card');
    //console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    //console.error('Error fetching data:', error);
    return null;  // Em caso de erro, retorne null ou um valor padrão.
  }
};

export const getAllBillsByCreditCard = async (creditCardId:number) => {
  try {
    const response = await api.get(`/bills/creditCardId/${creditCardId}`);
    //console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    //console.error('Error fetching data:', error);
    return null;  // Em caso de erro, retorne null ou um valor padrão.
  }
};

export const postData = async (data: any, quantity: number) => {
  const response = await api.post(`/bills/insert/${quantity}`, data);
  return response.data;
};

export const deleteBills = async (id: number) => {
  await api.delete(`/bills/${id}`)
}

export default api;