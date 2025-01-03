import imgPlaceHolder from '../../public/img/img-placeholder.png';
import Link from 'next/link';

const Movie=(props)=>{
    let URL= 'https://image.tmdb.org/t/p/w342'
    const getImagePoster=()=>{
        if(props.movie.poster_path){
            return `${URL}${props.movie.poster_path}`;
        }else{
            return imgPlaceHolder.src;
        }
    }

    // ambil 4 digit tahun
    const getYear=()=>{
        return new Date(props.movie.release_date).getFullYear();
    }
    // potong judul movie jika lebih dari 17 karakter
    const getTitle=()=>{
        if(props.movie.title.length >=17 ){
            return props.movie.title.substring(0,17)+'...';
        }else{
            return props.movie.title;
        }
    }
    // potong keterangan movie jika lebih 200 karakter
    const getOverView=()=>{
        if(props.movie.overview.length >= 200){
            return props.movie.overview.substring(0,200)+'...';
        }else{
            return props.movie.overview;
        }
    }

    // get genre
    const getGenre = ()=>{
        const genres = [
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
        let movieGenre=[];
        genres.forEach(
            (genre)=>{
                if(props.movie.genre_ids.includes(genre.id)){
                    movieGenre.push(genre.name);
                }
            }
        )
        return(
            <div className="flex justify-center">
                {movieGenre.map(
                    (genre)=>
                        <span className="bg-green-700 text-white py-1 px-2 rounded-md mr-1" key={genre.toString()}>{genre}</span>
                )}
            </div>
        )
    }

    // Component Movies
    return(
        <div className="relative cursor-pointer group w-1/2 md:w-1/3 xl:w-1/4 mb-5 p-5">
            <Link 
                key={props.movie.id} href={`/movie/detail/${props.movie.id}`}
            >
                <img 
                    src={getImagePoster()} 
                    alt={props.movie.title} 
                    className='w-full img-thumbnail rounded-md'
                />
            </Link>
            <span className='absolute top-[3%] right-[3%] text-base bg-rose-700 p-3 m-3 rounded-lg'>{props.movie.vote_average}</span>

            <div className="absolute top-[15%] left-0 w-full text-white text-center p-6 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <h2 className='text-xl mb-0'>{getTitle()}</h2>
                <p>{getYear()}</p>
                <p className="text-start hidden lg:block mx-10">{getOverView()}</p>
                {getGenre()}
            </div>
        </div>
    )
}

export default Movie;