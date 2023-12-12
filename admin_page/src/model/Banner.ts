export type BannerTs = {
  title: string;
  mainimgBanner: string;
  textimgBanner: string;
  linkUrl: string;
  startDate: Date;
  endDate: Date;
  createdTime: Date;
};

export type getBannerTs = BannerTs & {
  bannerId: number;
};
