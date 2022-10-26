import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { ITableItem } from '../../App';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import s from './Matrix.module.scss';
import MatrixRow from './MatrixRow';

interface IAvgValue {
    id: number,
    value: number
}

function Matrix() {
  const { matrix, data } = useTypedSelector((state) => state.matrix);
  const [avgValues, setAvgValues] = useState<IAvgValue[]>([]);
  const columns = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= data.columns; i += 1) {
      arr.push(i);
    }
    return arr;
  }, [data.columns]);

  const getAverageValue = useCallback((arr:ITableItem[][]) => {
    if (data.rows && data.columns) {
      for (let i = 0; i < data.columns; i += 1) {
        let sum = 0;
        for (let j = 0; j < data.rows; j += 1) {
          sum += arr[j][i].amount;
        }
        setAvgValues((prev) => [...prev,
          { id: Math.random(), value: Math.floor(sum / data.rows) }]);
      }
    }
  }, [data.rows, data.columns]);

  useEffect(() => {
    setAvgValues([]);
    getAverageValue(matrix);
  }, [getAverageValue, matrix]);

  return (
    <table className={s.matrix}>
      <tbody>
        <tr className={s.matrix__row}>
          <td>№</td>
          {columns.map((c) => <td key={c}>{c}</td>)}
          <td>Sum</td>
        </tr>
        {matrix.map((item, index) => (
          <MatrixRow
            position={index + 1}
            key={JSON.stringify(item)}
            rowData={item}
          />
        ))}
        <tr className={s.matrix__row}>
          <td>Avg</td>
          {avgValues.map((v) => <td className={s.matrix__avg} key={v.id}>{v.value}</td>)}
          <td className={s.matrix__avg}>{avgValues.reduce((acc, curr) => acc += curr.value, 0)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Matrix;
