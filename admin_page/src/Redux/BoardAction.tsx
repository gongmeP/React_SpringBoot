import { BoardTs } from 'src/model/Board';

export const setPages = (pages: number) => ({
  type: 'SET_PAGES',
  payload: pages,
});

export const setFreeBoards = (freeBoards: BoardTs) => ({
  type: 'setFreeBoards',
  payload: freeBoards,
});

export const setFreeBoardsEA = (freeBoardsEA: number) => ({
  type: 'setFreeBoardsEA',
  payload: freeBoardsEA,
});

export const setFormData = (formData: BoardTs) => ({
  type: 'setFormData',
  payload: formData,
});

export const setSearchTF = (SearchTF: string) => ({
  type: 'setSearchTF',
  payload: SearchTF,
});

export const SetSelectBoardArray = (SelectBoardArray: number[]) => ({
  type: 'SetSelectBoardArray',
  payload: SelectBoardArray,
});

export const setSearchPages = (SearchPages: number) => ({
  type: 'setSearchPages',
  payload: SearchPages,
});
