import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Movie from '../components/Movie';
console.log('pages/index.js')
export default function App() {
  const genres = [
    { "id": "", "name": "All" },
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
  ];
  let years = [];
  const thisYear = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    years.push(thisYear - i);
  }

  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState(thisYear);
  const [genreId, setGenreId] = useState('');
  const [genreName, setGenreName] = useState('All');
  const [page, setPage] = useState(1);

  const handleYearChange = (event) => {
    setYear(event.target.value);
    // reset page
    setPage(1);
  }

  const handleGenreChange = (event) => {
    setGenreId(event.target.value);
    let index = event.target.selectedIndex;
    setGenreName(event.target[index].text);
    setPage(1);
  }

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  useEffect(
    () => {
      const Token = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${Token}`
        }
      };

      const myFetch = async () => {
        try {
          let url = `https://api.themoviedb.org/3/discover/movie?`;
          url += `&certification_country=US`;
          url += `&certification.lte=PG-13`;
          url += `&primary_release_year=${year}`;
          url += `&with_genres=${genreId}`;
          url += `&page=${page}`;

          let response = await fetch(
            url, options);
          if (!response.ok) {
            throw new Error('Terjadi gangguan dengan kode: ' + response.status)
          }
          let data = await response.json();
          // jika halaman 1, isiulang state
          // jika 2 atau lebih, tambahkan ke dalam state movie
          if (page === 1) {
            setMovies(data.results)
          } else {
            setMovies(
              (prevMovie) => [...prevMovie, ...data.results]
            );
          }
        } catch (error) {
          console.log(error)
        }
      }
      myFetch();
    }, [year, genreId, page]
  ); 
  return (
    <React.Fragment>
      <Header />
      <nav>
        <div className="container mx-auto px-4 text-white">
          <div className="flex flex-wrap justify-center">
            {/* <div className="hidden md:flex items-center flex-grow mr-3">
              <hr className="flex-grow mr-3" />
              <small>powered by themoviedb.org</small>
            </div> */}
            <div className="flex md:w-1/4 space-x-4">
              <div className="flex-1">
                <label htmlFor="year" className="block text-sm font-medium">Year</label>
                <select 
                  name="year" 
                  id="year" 
                  className="block w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleYearChange} 
                  value={year}
                >
                  {years.map(
                    (year) => 
                      <option value={year} key={year.toString()}>{year}</option>
                  )}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="genre" className="block text-sm font-medium">Genre</label>
                <select 
                  name="genre" 
                  id="genre" 
                  onChange={handleGenreChange} 
                  value={genreId}
                  className="block w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {genres.map(
                    (genre) => 
                      <option value={genre.id} key={genre.id}>{genre.name}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-5">
        <div className="container mx-auto px-4">
          <h2 className='py-5 text-white text-center text-2xl'>{`Best Movie ${year}, genre: ${genreName}`}</h2>
          <h2 className='py-5 text-white text-center text-lg'>Best Movies</h2>
          <div className="flex flex-wrap">
            {
              movies.map(
                (movie) =>
                  <Movie
                    key={movie.id}
                    movie={movie}
                    url={`/movie/detail/${movie.id}`}
                  />
              )
            }
          </div>
          <div className="flex justify-center">
            <button 
              className="bg-lime-400 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors" 
              onClick={handleLoadMoreClick}
            >
              Load more...
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  )
}
