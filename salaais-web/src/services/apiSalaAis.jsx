import axios from "axios"

export const apiSalaAis = axios.create({
  baseURL: process.env.REACT_APP_SALA_AIS_API,
  headers: {
    "Content-Type": "application/json",
  },
})
export default apiSalaAis
