import axios from "axios";

const API_URL = "http://localhost:8080";

export const getGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/groups`);
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

export const createGroup = async (group) => {
  try {
    const response = await axios.post(`${API_URL}/api/group/register`, group);
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}