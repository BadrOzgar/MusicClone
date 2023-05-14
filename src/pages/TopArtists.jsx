import { useState } from 'react';

import { ArtistCard, Error, Loader } from '../components/';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  /* const [error, isFetching, data] = useGetTopChartsQuery(); */
  /*  const [error, isFetching, data] = useState('');

  if (isFetching) return <Loader title="Loading Top Artists" />;
  if (error) return <Error />; */

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-left mb-10 text-3xl text-white mt-4">
        Top Artist.
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {[1, 2, 3, 4, 5].map((track) => (
          <ArtistCard
          /*  key={track.key}
            track={track}
             */
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
