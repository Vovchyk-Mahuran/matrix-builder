import React from 'react';
import { useDispatch } from 'react-redux';
import s from './MatrixConfigOption.module.scss';

interface OptionProps {
    option: string
}
function MatrixConfigOption({ option }: OptionProps) {
  const dispatch = useDispatch();
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'CHANGE__MATRIX__DATA', payload: e.target });
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
