import { ITableItem } from '../App';

export const findClosestElements = (matrix: ITableItem[][], id: number, cells: number) => {
  const flatMatrix = matrix.flat(1);
  const cell = flatMatrix.find((item) => item.id === id);
  return cell && flatMatrix
    .sort((a, b) => Math.abs(a.amount - cell.amount) - Math.abs(cell.amount - b.amount))
    .slice(1, cells + 1);
};
