import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#45386e] py-1 p-4 rounded-lg cursor-pointer mb-2 ">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className="w-20 h-20 rounded-lg" src={img3} alt="cover" />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">
            {/* {song.title} */} Music for live
          </p>
        </Link>
        {/* <Link to={`/songs/${song.artists[0].adamid}`}> */}
        <p className="text-base text-gray-300 mt-1">
          {/* {song.subtitle} */} song Subtitle
        </p>
        {/* </Link> */}
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const DivRef = useRef(null);

  useEffect(() => {
    DivRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlay = ['Adell', 'tomato', 'hachkayne'].slice(0, 3);

  const topSong = [
    'Adell',
    'tomato',
    'hachkayne',
    'Hello',
    'Adell',
    'tomato',
    'hachkayne',
    'Hello',
  ].slice(0, 10);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={DivRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl"> Top 3 Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-0">
          {topPlay?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl"> Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topSong?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              song={song}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
              i={i}
            >
              {/* <Link to={`/artists/${song?.artists[0].adamid}`}>
              </Link> */}
              <img
                src={img2}
                className="rounded-full w-full"
                alt="artists image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
