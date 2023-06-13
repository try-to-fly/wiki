import { ScenicSpot, ScenicSpotDisplay } from "../components/ScenicSpot";

const data: ScenicSpot = {
  name: "test",
  summary: "test",
  rating: 5,
  bestSeason: "Spring",
  imageTextList: [
    {
      imageUrl: "https://picsum.photos/200/300",
      text: "test",
    },
  ],
  panoramaList: [
    {
      imageUrl:
        "https://newscdn-test.oss-cn-hangzhou.aliyuncs.com/tmp/test/digital_painting_in_the_vast_ocean_there_exist_sc.jpg",
    },
    {
      imageUrl:
        "https://newscdn-test.oss-cn-hangzhou.aliyuncs.com/tmp/test/dji_fly_20230407_091314_247_1680830361999_pano%2010.11.32.jpg",
    },
  ],
  videoList: [
    {
      videoUrl: "https://www.w3school.com.cn/i/movie.ogg",
      type: "TimeLapse",
    },
  ],
  routeMaps: [],
  pointsOfInterest: [],
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
};

export default function Test() {
  return <ScenicSpotDisplay scenicSpot={data} />;
}
