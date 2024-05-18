import axios from 'axios';

export const fetchMovies = async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
