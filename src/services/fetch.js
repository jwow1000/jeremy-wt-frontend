import api from "./api.js";

// utility fetch to see category ids
export const getCategoryId = async (slug) => {
  try {
    const response = await api.get(`/categories?slug=${slug}`);
    if (response.data.length > 0) {
      return response.data[0].id; // Return the category ID
    } else {
      throw new Error(`Category with slug "${slug}" not found.`);
    }
  } catch (error) {
    console.error("Error fetching category ID:", error);
    throw error;
  }
};

// get all posts with picture
export const fetchPosts = async () => {
  try {
    const response = await api.get("/posts?_embed");
    console.log("response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};



// get all videos, the id is 10
export const fetchVideos = async () => {
  try {
    const response = await api.get("/posts?categories=10&_embed");
    console.log("videos response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};



// get all webprojects, the id is 10
export const fetchWebProjects = async () => {
  try {
    const response = await api.get("/posts?categories=12&_embed");
    console.log("videos response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};