import axios from "axios";

export const apiSalaAis = axios.create({
  baseURL: process.env.REACT_APP_SALA_AIS_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const paymentPlan = async (accessToken, productKey) => {
  try {
    const { data } = await apiSalaAis.get(
      `${process.env.REACT_APP_SALA_AIS_API}stripe/pagamento-web${productKey}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar pagamento");
  }
};

export default apiSalaAis;
