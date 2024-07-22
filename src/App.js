import { useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import Logo from "./Logo";
import Box from "./Box";
import NavBar from "./NavBar";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import Search from "./Search";
import NumResults from "./NumResults";
import MovieList from "./MovieList";
import Main from "./Main";
import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WaatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handelCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  //handlers
  function handelSelectMovie(id) {
    setSelectedId((prevId) => (id === prevId ? null : id));
  }
  function handelCloseMovie() {
    setSelectedId(null);
  }
  function handelWatchedMovie(movie) {
    setWatched((prevWatched) => [...prevWatched, movie]);
  }
  function handelDeleteMovie(id) {
    setWatched((watchedMov) => watchedMov.filter((mov) => mov.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handelSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handelCloseMovie}
              onAddWatched={handelWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatchedMovie={handelDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
