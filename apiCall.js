import axios, { AxiosInstance } from 'axios';
const axoisInstance = axios.create({
  baseURL: 'https://invoice-service1.onrender.com',
  timeout: 2000,
});
export const fetchInvoiceData = async () => {
  const res = await axoisInstance.get('/invoices');

  return res.data;
};
export const processInvoicePayment = async (reqParam) => {
  const res = await axoisInstance.post('/invoicePaymnet', reqParam);

  return res;
};
