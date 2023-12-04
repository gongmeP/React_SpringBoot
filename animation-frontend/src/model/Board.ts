export type BoardTs = {
  fbNum: number;
  fbTitle: string;
  fbContent: string;
  userid: string;
  photo: string;
  fbReadCount: number;
  fbDate: Date;
  replyCount: number;
};

export type BoardFormDataTs = {
  fbTitle: string;
  fbContent: string | null;
  userid: string | null;
  photo: string;
};
