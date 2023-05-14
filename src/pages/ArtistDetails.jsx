import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistsDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistsId } = useParams();

  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistsDetailsQuery({ artist_id });

  /* if (isFetchingArtistDetails)
    return <Loader title="Loading" />;

  if (error) return <Error />; */

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistsId} artistData={artistData} />

      <RelatedSongs
        data={Object.value(artistData?.songs)}
        /*isPlaying={isPlaying}
        activeSong={activeSong}
         */
      />
    </div>
  );
};

export default ArtistDetails;
