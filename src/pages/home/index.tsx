import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Movie from '../../components/Movie';


type MovieType = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  popularity: number;
  genres: { name: string }[];
};
const App = () => {
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
  const years = [];
  const thisYear = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    years.push(thisYear - i);
  }

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [year, setYear] = useState(thisYear);
  const [genreId, setGenreId] = useState('');
  const [genreName, setGenreName] = useState('All');
  const [page, setPage] = useState(1);

  const handleYearChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setYear(+event.target.value);
    // reset page
    setPage(1);
  }

  const handleGenreChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setGenreId(event.target.value);
    setGenreName(selectedOption.text);
    setPage(1);
  }


  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  useEffect(
    () => {
      const Token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzIwOWI1MDA4YTk3ODAxM2IyNGMzZTdkMGEyNjkzNiIsIm5iZiI6MTczMzk5NzkxMS43NTgwMDAxLCJzdWIiOiI2NzVhYjU1N2M3ZDNmMmY5M2UxMmVlZjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WxkW9BNMarQSYtCDckbZLnh2DE5a-xTtCqWgX7a4zgE'
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

          const response = await fetch(
            url, options);
          if (!response.ok) {
            throw new Error('Terjadi gangguan dengan kode: ' + response.status)
          }
          const data = await response.json();
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
  ); console.log(movies);
  return (
    <React.Fragment>
      <Header />
      <nav>
        <div className="container text-white">
          <div className="row">
            <div className="col d-none d-md-flex align-items-center">
              <hr className="flex-grow-1 me-3" />
              <small>powered by themoviedb.org</small>
            </div>
            <div className="col col-md-3 d-flex">
              <div className="me-3">
                <label htmlFor="year" className="form-label">Year</label>
                <select name="year" id="year" className="form-select" onChange={handleYearChange} value={year}>
                  {years.map(
                    (year) =>
                      <option value={year} key={year.toString()}>{year}</option>
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="genre" className='form-label'>Genre</label>
                <select name="genre" id="genre" onChange={handleGenreChange} value={genreId} className="form-select">
                  {
                    genres.map(
                      (genre) =>
                        <option value={genre.id} key={genre.id}>{genre.name}</option>
                    )
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="pb-5">
        <div className="container">
          <h2 className='py-5 text-white text-center'>{`Best Movie ${year}, genre: ${genreName}`}</h2>
          <h2 className='py-5 text-white text-center'>Best Movies</h2>
          <div className="row">
            {
              movies.map(
                (movie) =>
                  <Movie
                    key={movie.id}
                    movie={movie}
                  />
              )
            }
          </div>
          <div className="row">
            <div className="btn btn-dark" onClick={handleLoadMoreClick}>
              Load more...
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default App;