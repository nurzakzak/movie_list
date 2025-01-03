// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import MovieDetail from '@/components/detail/MovieDetail';
import { GetServerSideProps } from "next";
// import imgPlaceHolder from '../../../../public/img/img-placeholder.png';



// const getImagePoster = ({image}:{image:string | null}) => {
//   let URL = 'https://image.tmdb.org/t/p/w342'
//   if (image && image.trim()) {
//     return `${URL}${image}`;
//   } else {
//     return imgPlaceHolder.src;
//   }
// }
type Movie = {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  popularity: number;
  genres: { name: string }[]; // Assuming genres is an array of objects with a 'name' property
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const Router = useRouter();
  const { slug } = context.params!;
  console.log('data' + slug)
  // Fetch data from external API
  try {
    const Token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzIwOWI1MDA4YTk3ODAxM2IyNGMzZTdkMGEyNjkzNiIsIm5iZiI6MTczMzk5NzkxMS43NTgwMDAxLCJzdWIiOiI2NzVhYjU1N2M3ZDNmMmY5M2UxMmVlZjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WxkW9BNMarQSYtCDckbZLnh2DE5a-xTtCqWgX7a4zgE'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${Token}`
      }
    };
    const URL = `https://api.themoviedb.org/3/movie/${slug}`;
    const response = await fetch(URL, options);
    const repo = await response.json();
    // return { props: { movie:repo } }
    return {
      props: {
        movie: {
          title: repo.title,
          overview: repo.overview,
          release_date: repo.release_date,
          poster_path: repo.poster_path,
          popularity:repo.popularity,
          genres: repo.genres 
        }
      }
    }
  } catch (error) {
    console.info(error)
    return { notFound: true }
  }
}
export default function MovieDetailPage(props: { movie: Movie }) {
  const { movie } = props
  return (
    <div>
      <MovieDetail Movie={movie} />
    </div>
  )
}

// export default MovieDetailPage;

