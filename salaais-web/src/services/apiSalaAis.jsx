import axios from "axios";

export const apiSalaAis = axios.create({
  baseURL: process.env.REACT_APP_SALA_AIS_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiSalaAis;

export const paymentPlan = (accessToken, productKey) => {
  return axios.get(`${process.env.REACT_APP_SALA_AIS_API}stripe/pagamento-web/${productKey}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};


