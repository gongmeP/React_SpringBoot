export type AdmindataTs = {
  adminid: string;
  adminpass: string;
  adminname: string;
  adminemail: string;
  adminnumber: string;
  admindepartment: string;
  adminrank: string;
  approval: string;
  iddelete: string;
};

export type UserdataTs = {
  id: number;
  mid: string;
  mpass: string;
  mname: string;
  memail: string;
  mnumber: string;
  maddress: string;
  logintime: Date;
  mtime: Date;
};
