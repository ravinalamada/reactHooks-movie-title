import React, { useState, useEffect } from "react";
import Filter from "./Filter"

function MovieComponent() {
  let [movies, setMovies] = useState([]);
  let [count, setCount] = useState(0);
  let [fileterdList, setFileterdList] = useState('');

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

  function HandleChange(e) {
      setFileterdList(e.target.value)
  }

  return (
    <section>
      <Filter value={fileterdList} handleChange={HandleChange}></Filter>
      {movies && movies
      .sort((a, b) => b.rt_score - a.rt_score)
      .filter((movie) => {
        return movie.title.toLowerCase().includes(fileterdList.toLowerCase())
      })
      .map(item => {
        return (
          <div key={item.id} className="container">
            <div className="wrapper">
              <h2 className="heading2">{item.title}</h2>
              <p>{item.release_date}</p>
              <p className="score">{item.rt_score} 💟</p>
            </div>
            <p>{item.description}</p>
            <div className="wrapperDesc">
              <p className="desc">{item.producer}</p>
              <p className="desc">{item.director}</p>
            </div>
            <span>Prisca and <b>{item.rt_score}</b> others like your movie</span>
            <div className="wrapper">
              <div className="wrapper">
              <button className="like" id={item.id} onClick={HandleIncrement}></button>
              <button className="dislike" id={item.id} onClick={HandleDecrement}></button>
              </div>
              <button className="delete" id={item.id} onClick={DeleteMovie}></button>
            </div>
          </div>
        )
      })}
    </section>
  )

}




export default MovieComponent;


