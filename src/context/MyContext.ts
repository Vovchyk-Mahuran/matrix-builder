/* eslint-disable no-unused-vars */
import { createContext, Dispatch, SetStateAction } from 'react';
import { ITableData, ITableItem } from '../App';

export type GlobalContext = {
    data: ITableData
    matrix: ITableItem[][]
    clickCellHandler: (id: number) => void
    mouseEnterCellHandler: (id: number) => void
    closestElements: ITableItem[]
    setClosestElements: Dispatch<SetStateAction<ITableItem[]>>
    deleteTableRow: (id: number) => void
}

const MyContext = createContext<GlobalContext>({
  data: {
    rows: 0, columns: 0, cells: 0,
  },
  matrix: [],
  clickCellHandler: () => {},
  mouseEnterCellHandler: () => {},
  closestElements: [],
  setClosestElements: () => {},
  deleteTableRow: () => {},
});

export default MyContext;
