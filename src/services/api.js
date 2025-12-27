import { API_KEY, BASE_URL } from "../config/tmdb";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );

    const data = await response.json();

    if (!response.ok || !data.results) {
      console.error("TMDB error:", data);
      return []; // ✅ NEVER crash UI
    }

    return data.results;
  } catch (error) {
    console.error("Network error:", error);
    return []; // ✅ NEVER crash UI
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    if (!response.ok || !data.results) {
      console.error("TMDB error:", data);
      return [];
    }

    return data.results;
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
};
