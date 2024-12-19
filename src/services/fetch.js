import api from "./api.js";

// utility fetch to see category ids, use for dev only
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

// get a post with id
export const fetchPost = async ( id ) => {
  try {
    const response = await api.get(`/posts/?slug=${ id }`);
    console.log("response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
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

// get all posts with things(objects in the wordpress CMS) as parent, the id is 2
export const fetchThings = async () => {
  try {
    const response = await api.get("/posts?categories=2&_embed");
    return response.data;
  } catch (error) {
    console.error("Error fetching the videos category:", error);
    throw error;
  }
};


// get all videos, the id is 10
export const fetchVideos = async () => {
  try {
    const response = await api.get("/posts?categories=5&_embed");
    console.log("videos response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching the videos category:", error);
    throw error;
  }
};

// get all sounds, the id is 14
export const fetchSounds = async () => {
  try {
    const response = await api.get("/posts?categories=14&_embed");
    console.log("sounds response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching the videos category:", error);
    throw error;
  }
};



// get all webprojects, the id is 12
export const fetchWebProjects = async () => {
  try {
    const response = await api.get("/posts?categories=6&_embed");
    console.log("videos response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching the Web Portfolio:", error);
    throw error;
  }
};