export type AnidataTs = {
  id: number;
  title: string;
  photo: string;
  content: string;
  date: Date;
  dayOfWeek: string;
  genre: string;
  viewCount: number;
};

export type UserViewAnidataTs = Omit<
  AnidataTs,
  'content' | 'genre' | 'date' | 'dayOfWeek' | 'viewCount'
>;
