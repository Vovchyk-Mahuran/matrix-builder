import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { ITableItem } from '../../../App';
import MyContext from '../../../context/MyContext';
import s from './MatrixRow.module.scss';

interface IRowData {
    rowData: ITableItem[],
    position: number,
}
function MatrixRow({
  rowData, position,
}: IRowData) {
  const {
    closestElements, setClosestElements, clickCellHandler, mouseEnterCellHandler, deleteTableRow,
  } = useContext(MyContext);
  const [sum, setSum] = useState(0);
  const [sumMouseEnter, setSumMouseEnter] = useState(false);

  const getPercentage = useCallback((cell:ITableItem) => `${Math.round((cell.amount * 100) / sum)}%`, [sum]);

  const stylesFunc = useCallback((cell: ITableItem) => {
    if (sumMouseEnter) return { background: `linear-gradient( to top, red ${getPercentage(cell)}, transparent 0%)` };
    if (closestElements.includes(cell)) return { background: 'yellow' };
    return { color: ' ' };
  }, [sumMouseEnter, closestElements, getPercentage]);

  useEffect(() => {
    setSum(rowData.reduce((acc, curr) => acc += curr.amount, 0));
  }, [rowData]);

  return (
    <tr className={s.matrix__row}>
      <td className={s.matrix__cell__number}>{position}</td>
      {rowData.map((cell) => (
        <td
          role="presentation"
          onClick={() => clickCellHandler(cell.id)}
          onMouseEnter={() => mouseEnterCellHandler(cell.id)}
          onMouseLeave={() => setClosestElements([])}
          className={s.matrix__cell}
          key={cell.id}
          style={stylesFunc(cell)}
        >
          {sumMouseEnter ? getPercentage(cell) : cell.amount}
        </td>
      ))}
      <td
        className={s.matrix__cell__sum}
        onMouseEnter={() => setSumMouseEnter(true)}
        onMouseLeave={() => setSumMouseEnter(false)}
      >
        {sum}
      </td>
      <td
        role="presentation"
        className={s.matrix__cell__delete}
        onClick={() => deleteTableRow(position - 1)}
      >
        x
      </td>
    </tr>
  );
}

export default MatrixRow;
