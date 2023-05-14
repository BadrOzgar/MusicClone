import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components/';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPalying } = useSelector((state) => state.player);

  /* const [error, isFetching, data] = useGetSongsByCountryQuery(); */

  /* if (isFetching && loading) return <Loader title="Loading songs Around you" />;
  if (error && country) return <Error />; */

  //run once the user vits the page, and recall it every the Country Change
  //using GeoApi
  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_IaB0z6CsBMqx7wMUVQ2RikKz3sj2L`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-left mb-10 text-3xl text-white mt-4">
        Around You
        <span className="font-bold">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {[1, 2, 3, 4, 5].map((song, i) => (
          <SongCard
          /*  key={song.key}
            song={song}
            isPlaying={isPalying}
            activeSong={activeSong}
            data={data}
            i={i} */
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
