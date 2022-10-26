import React, { Dispatch, SetStateAction } from 'react';
import { ITableData } from '../../../App';
import s from './MatrixConfigOption.module.scss';

interface OptionProps {
    option: string
    setData: Dispatch<SetStateAction<ITableData>>
}
function MatrixConfigOption({ option, setData }: OptionProps) {
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setData((prev:ITableData) => ({
      ...prev,
      [e.target.name]: +e.target.value,
    }));
  };

  return (
    <div className={s.option}>
      <p className={s.option__key}>
        Enter the number of
        {' '}
        {option}
      </p>
      <input
        min={1}
        max={8}
        name={option}
        onChange={changeHandler}
        className={s.option__counter}
        type="number"
      />
    </div>
  );
}

export default MatrixConfigOption;
