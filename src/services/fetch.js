import api from "./api.js";

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