import React, { useState, useEffect } from "react";

function MovieComponent() {
  let [movies, setMovies] = useState([]);

  async function FetchMovie() {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films`);
    let data = await response.json();
    setMovies(() => movies = data);
    console.log(movies);
  }

  useEffect(() => {
    FetchMovie()
  }, []);

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

          </div>
        )
      })}
    </section>
  )

}




export default MovieComponent;


