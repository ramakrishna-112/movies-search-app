import "../css/WatchLater.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function WatchLater() {
    const { watchLater } = useMovieContext();

    return (
        <div className="watch-later-page">

            {watchLater.length === 0 ? (
                <div className="empty-message">
                    <h2>Your Watch Later List</h2>
                    <p>No movies in Watch Later.</p>
                    <p>Start adding movies to your Watch Later list!</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {watchLater.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default WatchLater;
