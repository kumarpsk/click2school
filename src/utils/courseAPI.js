import { apiService } from "@/utils/apiServices";
import { API_URL } from "./constant";

export const getCourse = async (courseId) => {
  try {
    const response = await apiService(`${API_URL}/course/api/courses/${courseId}`, 'GET');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (courseId, course) => {
  try {
    const response = await apiService(`${API_URL}/course/api/courses/${courseId}/`, 'PUT', course);
    return response.data;
  } catch (error) {
    throw error;
  }
};
