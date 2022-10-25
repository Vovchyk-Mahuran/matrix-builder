import React, { useCallback, useMemo, useState } from 'react';
import './App.scss';
import Matrix from './components/Matrix';
import MatrixConfigScreen from './components/MatrixConfigScreen';
import MyContext from './context/MyContext';

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
  const [isTableShown, setIsTableShown] = useState<boolean>(false);
  const [data, setData] = useState<ITableData>({
    rows: 0,
    columns: 0,
    cells: 0,
  });
  const [matrix, setMatrix] = useState<ITableItem[][]>([]);
  const [closestElements, setClosestElements] = useState<ITableItem[]>([]);

  const createTableRow = (): void => {
    const row: ITableItem[] = [];
    for (let i = 0; i < data.columns; i += 1) {
      row.push({
        id: Math.random(),
        amount: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      });
    }
    setMatrix((prev) => ([...prev, row]));
  };

  const createMatrix = (): void => {
    if (!isTableShown && Object.values(data).every((v) => v !== 0)) {
      for (let i = 0; i < data.rows; i += 1) {
        createTableRow();
      }
      setIsTableShown(true);
    }
  };

  const clickCellHandler = useCallback((id: number): void => {
    const temp = matrix.map((item) => item.map((n) => {
      if (n.id === id) return { ...n, amount: n.amount + 1 };
      return n;
    }));
    setMatrix(temp);
  }, [matrix]);

  const mouseEnterCellHandler = useCallback((id: number): void => {
    const flatMatrix = matrix.flat(1);
    const cell = flatMatrix.find((item) => item.id === id);
    const sortedMatrix = cell && flatMatrix
      .sort((a, b) => Math.abs(a.amount - cell.amount) - Math.abs(cell.amount - b.amount))
      .slice(1, data.cells + 1);
    setClosestElements(sortedMatrix || []);
  }, [matrix, data.cells]);

  const deleteTableRow = useCallback((id: number): void => {
    const temp = matrix.filter((_item, idx) => idx !== id);
    setData((prev) => ({ ...prev, rows: data.rows - 1 }));
    setMatrix(temp);
    if (!(data.rows - 1)) {
      setIsTableShown(false);
      setData({ rows: 0, columns: 0, cells: 0 });
    }
  }, [matrix, data.rows]);

  const contextValue = useMemo(() => ({
    matrix,
    data,
    clickCellHandler,
    mouseEnterCellHandler,
    closestElements,
    setClosestElements,
    deleteTableRow,
  }), [matrix, data, clickCellHandler, mouseEnterCellHandler, closestElements, deleteTableRow]);

  return (
    <MyContext.Provider value={contextValue}>
      <div className="App">
        <div className="App__configureScreen">
          {!isTableShown
            ? <MatrixConfigScreen createMatrix={createMatrix} setData={setData} />
            : (
              <>
                {data.rows < 8 && (
                  <button
                    className="App__createRow"
                    type="button"
                    onClick={() => {
                      createTableRow();
                      setData((prev) => ({ ...prev, rows: data.rows + 1 }));
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
    </MyContext.Provider>
  );
}

export default App;
