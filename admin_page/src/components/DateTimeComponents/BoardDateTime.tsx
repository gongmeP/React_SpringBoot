import React from 'react';

interface DateTimeProp {
  fbDate: Date;
}

function BoardDateTime({ fbDate }: DateTimeProp) {
  const date = new Date(fbDate);
  // const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return <span>{`${month}/${day} ${hours}:${minutes}`}</span>;
}

export default BoardDateTime;
