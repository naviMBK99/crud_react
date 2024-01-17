import React from "react";
import "./Movie.css";
const MovieCard = ({
  title,
  author,
  year,
  image,
  id,
  deleteMovie,
  editMovie,
  edit,
  valueTitle,
  setValueTitle,
  valueAuthor,
  setValueAuthor,
  valueYear,
  setValueYear,
  saveEditMovie,
  valueImage,
  setValueImage,
}) => {
  const editMovieDetails = () => {
    editMovie(id, title, author, year, image);
  };

  return (
    <div>
      <div className="movie-card">
        <img src={image} alt={title} />
        <label>
          {edit === id ? (
            <div>
              <input
                onChange={(e) => setValueTitle(e.target.value)}
                value={valueTitle}
                type="text"
                placeholder="Title"
              />
              <input
                onChange={(e) => setValueAuthor(e.target.value)}
                value={valueAuthor}
                type="text"
                placeholder="Author"
              />
              <input
                onChange={(e) => setValueYear(e.target.value)}
                value={valueYear}
                type="text"
                placeholder="Year"
              />
              <input
                onChange={(e) => setValueImage(e.target.value)}
                value={valueImage}
                type="text"
                placeholder="Image"
              />
            </div>
          ) : (
            <div>
              <h3>{title}</h3>
              <p>{author}</p>
              <p>{year}</p>
            </div>
          )}
          {edit === id ? (
            <div className="btns">
              <button onClick={() => saveEditMovie(id)}>Save</button>
            </div>
          ) : (
            <div className="btns">
              <button onClick={() => deleteMovie(id)} className="deleteBtn">
                Delete
              </button>
              <button onClick={editMovieDetails}>Edit</button>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};
export default MovieCard;
