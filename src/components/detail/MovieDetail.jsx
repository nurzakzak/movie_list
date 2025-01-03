// import Link from 'next/link';
import imgPlaceHolder from '../../../public/img/img-placeholder.png';

const MovieDetail = ({ Movie }) => {
  let URL = 'https://image.tmdb.org/t/p/w342'
  const getImagePoster = () => {
    if (Movie.poster_path) {
      return `${URL}${Movie.poster_path}`;
    } else {
      return imgPlaceHolder.src;
    }
  }

  const getYear=()=>{
    return new Date(Movie.release_date).getFullYear();
  }

  const formatDate=(dateString)=>{
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month= String(date.getMonth()+1).padStart(2,'0');
    const year= date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  return (
    <>
      <div class="container mx-auto px-4 py-8">
        {/* <!-- Movie Detail Section --> */}
        <div class="flex flex-col lg:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* <!-- Movie Poster --> */}
          <div class="lg:w-64">
            <img src={getImagePoster()} alt="Movie Poster" class="w-full h-full object-cover" />
          </div>
          {/* <!-- Movie Info --> */}
          <div class="lg:w-2/3 p-6">
            <div class="flex justify-between items-center">
              <h1 class="text-3xl font-bold">{`${Movie.title} (${getYear()})`}</h1>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-bold bg-green-500 text-gray-900 px-3 py-1 rounded-full">{Movie.popularity} %</span>
                <span class="text-sm text-gray-400">User Score</span>
              </div>
            </div>
            {/* <!-- Genre and Duration --> */}
            <p class="text-gray-400 mt-2">{Movie.genres && Movie.genres.map((genre) => genre.name).join(', ')}</p>
            
            <p class="text-gray-400 mt-1">Release Date: {formatDate(Movie.release_date)} (ID)</p>
            {/* <!-- Overview --> */}
            <h2 class="text-xl font-semibold mt-4">Overview</h2>
            <p class="text-gray-300 mt-2">
             {Movie.overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default MovieDetail;