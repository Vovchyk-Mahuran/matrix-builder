import React, {
  useState, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

import './App.scss';
import Matrix from './components/Matrix';
import MatrixConfigScreen from './components/MatrixConfigScreen';
import { useTypedSelector } from './hooks/useTypedSelector';
import { MatrixActionTypes } from './types/matrix';

export interface ITableData {
    rows: number,
    columns: number,
    cells: number,
}

export interface ITableItem {
    id: number,
    amount: number,
}

function App() {
  const { data } = useTypedSelector((state) => state.matrix);
  const dispatch = useDispatch();
  const [isTableShown, setIsTableShown] = useState<boolean>(false);

  const createTableRow = (): void => {
    const row: ITableItem[] = [];
    for (let i = 0; i < data.columns; i += 1) {
      row.push({
        id: Math.random(),
        amount: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      });
    }
    dispatch({ type: MatrixActionTypes.ADD__MATRIX__ROW, payload: row });
  };

  const createMatrix = (): void => {
    if (!isTableShown && Object.values(data).every((v) => v !== 0)) {
      for (let i = 0; i < data.rows; i += 1) {
        createTableRow();
      }
      setIsTableShown(true);
    }
  };

  useEffect(() => {
    if (!data.rows) setIsTableShown(false);
  }, [data.rows]);

  return (
    <div className="App">
      <div className="App__configureScreen">
        {!isTableShown
          ? <MatrixConfigScreen createMatrix={createMatrix} />
          : (
            <>
              {data.rows < 8 && (
              <button
                className="App__createRow"
                type="button"
                onClick={() => {
                  createTableRow();
                  dispatch({ type: MatrixActionTypes.INCREASE__DATA__ROWS });
                }}
              >
                Add row
              </button>
              )}
              <Matrix />
            </>
          )}
      </div>
    </div>
  );
}

export default App;
