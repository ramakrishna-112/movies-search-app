import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPopularMovies(page);
  }, []);

  const loadPopularMovies = async (pageNum) => {
    try {
      setLoading(true);
      const popularMovies = await getPopularMovies(pageNum);
      if (popularMovies.length > 0) {
        setMovies((prev) => [...prev, ...popularMovies]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setIsSearching(true);
    try {
      setMovies([]); // clear existing movies before showing new results
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
      setHasMore(false);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPopularMovies(nextPage);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setMovies([]);
    setPage(1);
    setIsSearching(false);
    setHasMore(true);
    loadPopularMovies(1);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {isSearching && (
          <button type="button" className="reset-button" onClick={handleResetSearch}>
            Reset
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      {!loading && movies.length === 0 && (
        <div className="no-results">No movies found.</div>
      )}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {!isSearching && hasMore && !loading && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
