import React, { useState, useEffect } from "react";

function MovieComponent() {
  let [movies, setMovies] = useState([]);
  let [count, setCount] = useState(0);

  async function FetchMovie() {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films`);
    let data = await response.json();
    setMovies(() => movies = data);
  }

  useEffect(() => {
    FetchMovie()
  }, []);

  function HandleIncrement (e) {
    const id = e.target.id;
    const dataId = movies.find(item => item.id === id);
    const increment = dataId.rt_score++;
    setCount(increment)
  }

  function HandleDecrement (e) {
    const id = e.target.id;
    const dataId = movies.find(item => item.id === id);
    const decrement = dataId.rt_score--;
    setCount(decrement)
  }

  function DeleteMovie (e) {
    const id = e.target.id;
    const filterdMovie = movies.filter(movie => movie.id != id);
    setMovies(filterdMovie);
  }

  return (
    <section>
      {movies && movies
      .sort((a, b) => b.rt_score - a.rt_score)
      .map(item => {
        return (
          <div key={item.id} className="container">
            <div className="wrapper">
              <h2>{item.title}</h2>
              <p>{item.release_date}</p>
              <p>{item.rt_score}</p>
            </div>
            <p>{item.description}</p>
            <div className="wrapper">
              <p>{item.producer}</p>
              <p>{item.director}</p>
            </div>
            <div>
              <button className="like" id={item.id} onClick={HandleIncrement}>Like</button>
              <button className="unlike" id={item.id} onClick={HandleDecrement}>Unlike</button>
              <button className="delete" id={item.id} onClick={DeleteMovie}>Delete</button>
            </div>
          </div>
        )
      })}
    </section>
  )

}




export default MovieComponent;


