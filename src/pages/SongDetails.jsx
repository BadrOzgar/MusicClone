import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();

  const { data: songData, isFetching: isFetchingSongeDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    datas,
    isFetching: isFetchingSongRelated,
    error,
  } = useGetSongRelatedQuery({ songid });

  /* if (isFetchingSongeDetails || isFetchingSongRelated)
    return <Loader title="Searching" />;

  if (error) return <Error />; */

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {songData?.section[1].type === 'LYRICS' ? (
            songData?.section[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, this Song doesn't have Lyrics
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
      /* data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick} */
      />
    </div>
  );
};

export default SongDetails;
