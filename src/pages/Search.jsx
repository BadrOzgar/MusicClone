import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components/';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPalying } = useSelector((state) => state.player);

  const [error, isFetching, data] = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits?.map((song) => song.track);

  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-left mb-10 text-3xl text-white mt-4">
        Showing Result For
        <span className="font-black ">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {
          /* songs */ [1, 2, 3, 4, 5].map((song, i) => (
            <SongCard
            /*  key={song.key}
            song={song}
            isPlaying={isPalying}
            activeSong={activeSong}
            data={data}
            i={i} */
            />
          ))
        }
      </div>
    </div>
  );
};

export default Search;
