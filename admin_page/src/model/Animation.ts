export type AnidataTs = {
  id: number;
  title: string;
  photo: string;
  content: string;
  viewedTime: Date;
  dayOfWeek: string;
  genre: string;
  viewCount: number;
  averageRating: number;
  uploaded: string;
  favorite: string;
};

export type SaveAnidataTs = Omit<AnidataTs, 'id'> & {
  viewed: string;
};

export type UserViewAnidataTs = Omit<
  AnidataTs,
  'content' | 'genre' | 'date' | 'dayOfWeek' | 'viewCount'
>;

export type GenreArray = {
  genre: string[];
};

export type AniReviewLikeTs = {
  like_id: number;
  aniReview: AniReviewTs;
};
export type AniReviewTs = {
  reviewId: number;
  memberMid: string;
  animationTitle: string;
  rating: number;
  reviewDate: Date;
  likes: number;
  reviewText: string;
};
