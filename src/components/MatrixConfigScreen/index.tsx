import React, { Dispatch, SetStateAction } from 'react';
import { ITableData } from '../../App';
import MatrixConfigOption from './MatrixConfigOption';
import s from './MatrixConfigScreen.module.scss';

const options = ['rows', 'columns', 'cells'];
interface IMatrixConfigProps {
    setData: Dispatch<SetStateAction<ITableData>>,
    createMatrix: () => void
}

function MatrixConfigScreen({ setData, createMatrix }:IMatrixConfigProps) {
  return (
    <div className={s.container}>
      <h1 className={s.container__title}>Matrix builder</h1>
      <div className={s.container__options}>
        {options.map((option) => <MatrixConfigOption setData={setData} option={option} />)}
      </div>
      <button
        onClick={createMatrix}
        type="button"
        className={s.container__btn}
      >
        Create matrix
      </button>
    </div>
  );
}

export default MatrixConfigScreen;
