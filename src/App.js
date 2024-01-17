import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieAuthor, setMovieAuthor] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieImage, setMovieImage] = useState("");

  const [edit, setEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editImage, setEditImage] = useState("");

  //! Create
  const addMovie = (e) => {
    e.preventDefault();
    setMovies([
      ...movies,
      {
        title: movieTitle,
        author: movieAuthor,
        year: movieYear,
        image: movieImage,
        id: Date.now(),
      },
    ]);
    setMovieTitle("");
    setMovieAuthor("");
    setMovieYear("");
    setMovieImage("");
  };

  // ! READ
  useEffect(() => {
    const data = localStorage.getItem("movies");
    setMovies(JSON.parse(data) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  //! Delete
  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((elem) => elem.id !== id);
    setMovies(updatedMovies);
  };

  //! Edit
  const editMovie = (id, title, author, year, image) => {
    setEdit(id);
    setEditTitle(title);
    setEditAuthor(author);
    setEditYear(year);
    setEditImage(image);
  };
  const saveEditMovie = (id) => {
    const newMovies = movies.map((elem) => {
      if (elem.id === id) {
        elem.title = editTitle;
        elem.author = editAuthor;
        elem.year = editYear;
        elem.image = editImage;
      }
      return elem;
    });
    setMovies(newMovies);
    setEdit(null);
    setEditTitle("");
    setEditAuthor("");
    setEditYear("");
    setEditImage("");
  };
  return (
    <div>
      <div className="container">
        <h1>MOVIE CENTER</h1>
        <div className="input-field">
          <form onSubmit={addMovie}>
            <input
              type="text"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="text"
              value={movieAuthor}
              onChange={(e) => setMovieAuthor(e.target.value)}
              placeholder="Author"
            />
            <input
              type="text"
              value={movieYear}
              onChange={(e) => setMovieYear(e.target.value)}
              placeholder="Year"
            />
            <input
              type="text"
              value={movieImage}
              onChange={(e) => setMovieImage(e.target.value)}
              placeholder="Image URL"
            />

            <button type="submit" className="add">
              Add Movie
            </button>
          </form>
        </div>
      </div>
      <ul>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            deleteMovie={deleteMovie}
            editMovie={editMovie}
            edit={edit}
            valueTitle={editTitle}
            setValueTitle={setEditTitle}
            valueAuthor={editAuthor}
            setValueAuthor={setEditAuthor}
            valueYear={editYear}
            setValueYear={setEditYear}
            setValueImage={setEditImage}
            saveEditMovie={() => saveEditMovie(movie.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
