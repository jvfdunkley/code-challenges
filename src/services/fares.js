import axios from "axios";
const baseUrl = "http://localhost:3001";

const getInfo = () => {
  const request = axios.get(`${baseUrl}/info`);
  return request.then((response) => response.data);
};

const getZones = () => {
  const request = axios.get(`${baseUrl}/zones`);
  return request.then((response) => response.data);
};

export default { getInfo, getZones };
