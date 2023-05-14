import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { selectGenreListId } from '../redux/features/playerSlice';
import {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
} from '../redux/services/shazamCore';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetTopChartsQuery(); //useGetSongsByGenreQuery

  if (isFetching) return <Loader title="Loading Songs" />;
  if (error) return <Error />;

  /* const GenreTitle = genres.find(({ value }) => value === genreListId)?.title; */
  const GenreTitle = 'POP';

  return (
    <div className="flex flex-col">
      {/* Child of the Title and select options */}
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {GenreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'Pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      {/* End of Child */}

      {/* Child of wrapper songs */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
      {/* End of Child */}
    </div>
  );
};

export default Discover;
