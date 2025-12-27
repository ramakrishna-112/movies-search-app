import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
    const {
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        isWatchLater,
        addToWatchLater,
        removeFromWatchLater
    } = useMovieContext();

    const favorite = isFavorite(movie.id);
    const watchLater = isWatchLater(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    function onWatchLaterClick(e) {
        e.preventDefault();
        if (watchLater) removeFromWatchLater(movie.id);
        else addToWatchLater(movie);
    }

    const cardClass = `movie-card ${watchLater ? "watch-later-active" : ""}`;

    return (
        <div className={cardClass}>
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "Movie Poster"}
                />
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        ♥
                    </button>
                    <button
                        className={`watch-later-btn ${watchLater ? "active" : ""}`}
                        onClick={onWatchLaterClick}
                        aria-label={watchLater ? "Remove from watch later" : "Add to watch later"}
                    >
                        ⏰
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard;
