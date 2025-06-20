import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    console.log(json.data.movie.torrents.url);
    console.log(json.data.movie.genres);
    setMovie(json.data.movie);
    setLoading(false);
  };
  console.log(id);
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h2>{movie.title_long}</h2>
          <ul>
            <li>{movie.genres}</li>
          </ul>
          <p>{movie.description_full}</p>
          <ul>
            <li>
              <a href={movie.torrents.url}>torrents</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
