import React, {
  useState, useEffect, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { ITableItem } from '../../../App';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { MatrixActionTypes } from '../../../types/matrix';
import s from './MatrixRow.module.scss';

interface IRowData {
    rowData: ITableItem[],
    position: number,
}
function MatrixRow({
  rowData, position,
}: IRowData) {
  const { closestElements } = useTypedSelector((state) => state.matrix);
  const [sum, setSum] = useState(0);
  const [sumMouseEnter, setSumMouseEnter] = useState(false);
  const dispatch = useDispatch();

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
      <td className={s['matrix__cell--number']}>{position}</td>
      {rowData.map((cell) => (
        <td
          role="presentation"
          onClick={() => dispatch({ type: MatrixActionTypes.CLICK__CELL, payload: cell.id })}
          onMouseEnter={() => dispatch({
            type: MatrixActionTypes.CELL__MOUSE__ENTER,
            payload: cell.id,
          })}
          onMouseLeave={() => dispatch({ type: MatrixActionTypes.RESET__CLOSEST })}
          className={s.matrix__cell}
          key={cell.id}
          style={stylesFunc(cell)}
        >
          {sumMouseEnter ? getPercentage(cell) : cell.amount}
        </td>
      ))}
      <td
        className={s['matrix__cell--sum']}
        onMouseEnter={() => setSumMouseEnter(true)}
        onMouseLeave={() => setSumMouseEnter(false)}
      >
        {sum}
      </td>
      <td
        role="presentation"
        className={s['matrix__cell--delete']}
        onClick={() => dispatch({
          type: MatrixActionTypes.DELETE__MATRIX__ROW,
          payload: position - 1,
        })}
      >
        x
      </td>
    </tr>
  );
}

export default MatrixRow;
