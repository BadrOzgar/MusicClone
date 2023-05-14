import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components/';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const { activeSong, isPalying } = useSelector((state) => state.player);

  /* const [error, isFetching, data] = useGetTopChartsQuery(); */
  const [error, isFetching, data] = useState('');

  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-left mb-10 text-3xl text-white mt-4">
        Discover Top Charts
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

export default TopCharts;
