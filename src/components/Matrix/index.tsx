import React, {
  useContext, useEffect, useMemo, useState, useCallback,
} from 'react';
import { ITableItem } from '../../App';
import MyContext from '../../context/MyContext';
import s from './Matrix.module.scss';
import MatrixRow from './MatrixRow';

function Matrix() {
  const { data, matrix } = useContext(MyContext);
  const [avgValues, setAvgValues] = useState<number[]>([]);
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
        setAvgValues((prev) => [...prev, Math.floor(sum / data.rows)]);
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
          {columns.map((c) => <td key={c * Math.random()}>{c}</td>)}
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
          {avgValues.map((v) => <td className={s.matrix__avg} key={v * Math.random()}>{v}</td>)}
          <td className={s.matrix__avg}>{avgValues.reduce((acc, curr) => acc += curr, 0)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Matrix;
