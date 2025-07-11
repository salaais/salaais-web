import axios from "axios";

export const apiSalaAis = axios.create({
  baseURL: process.env.REACT_APP_SALA_AIS_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiSalaAis;

export const paymentPlan = async (accessToken, priceId, permissionKey) => {
  try {
    const { data } = await apiSalaAis.get(
      `stripe/pagamento-web?price_id=${encodeURIComponent(priceId)}&permission_key=${encodeURIComponent(permissionKey)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar pagamento");
  }
};
