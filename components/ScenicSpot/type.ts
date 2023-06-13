// 定义航拍、延时等视频类型
type VideoType = "Aerial" | "TimeLapse" | "Standard";

// 定义兴趣点类型（餐馆、景点、停车点等）
type PointOfInterestType = "Restaurant" | "Attraction" | "Parking";

// 定义景点坐标
type Coordinates = {
  latitude: number; // 纬度
  longitude: number; // 经度
};

// 定义兴趣点
type PointOfInterest = {
  type: PointOfInterestType; // 兴趣点类型
  name: string; // 兴趣点名称
  coordinates: Coordinates; // 兴趣点坐标
};

// 定义图文列表项
type ImageTextItem = {
  imageUrl: string; // 图片URL
  text: string; // 描述文本
};

// 定义视频列表项
type VideoItem = {
  videoUrl: string; // 视频URL
  type: VideoType; // 视频类型（航拍、延时等）
};

// 定义全景图列表项
type PanoramaImageItem = {
  imageUrl: string; // 全景图URL
};

// 定义路线图项
type RouteMapItem = {
  name: string; // 路线名称
  coordinatesList: Coordinates[]; // 路线坐标列表
};

// 定义景点信息
export type ScenicSpot = {
  name: string; // 景点名称
  coordinates: Coordinates; // 景点坐标信息
  imageTextList: ImageTextItem[]; // 图文列表
  videoList: VideoItem[]; // 视频列表
  panoramaList: PanoramaImageItem[]; // 全景图列表
  routeMaps: RouteMapItem[]; // 路线图
  pointsOfInterest: PointOfInterest[]; // 兴趣点标注
  rating: number; // 景点评分 (1-5)
  summary: string; // 景点总结
  bestSeason: "Spring" | "Summer" | "Autumn" | "Winter"; // 最佳游玩季节
};
