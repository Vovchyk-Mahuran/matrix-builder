/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { ITableData, ITableItem } from '../App';

export enum MatrixActionTypes {
    ADD__MATRIX__ROW = 'ADD__MATRIX__ROW',
    INCREASE__DATA__ROWS = 'INCREASE__DATA__ROWS',
    DELETE__MATRIX__ROW = 'DELETE__MATRIX__ROW',
    CHANGE__MATRIX__DATA = 'CHANGE__MATRIX__DATA',
    CLICK__CELL = 'CLICK__CELL',
    CELL__MOUSE__ENTER = 'CELL__MOUSE__ENTER',
    RESET__CLOSEST = 'RESET__CLOSEST'
}

export interface MatrixState {
    matrix: ITableItem[][],
    data: ITableData,
    closestElements: ITableItem[]
}
interface AddMatrixRowAction {
    type: MatrixActionTypes.ADD__MATRIX__ROW
    payload: ITableItem[]
}
interface IncreaseDataRows {
    type: MatrixActionTypes.INCREASE__DATA__ROWS
}
interface DeleteMatrixRow {
    type: MatrixActionTypes.DELETE__MATRIX__ROW
    payload: number
}
interface ChangeMatrixData {
    type: MatrixActionTypes.CHANGE__MATRIX__DATA
    payload: HTMLInputElement
}
interface ClickCell {
    type: MatrixActionTypes.CLICK__CELL
    payload: number
}
interface CellMouseEnter {
    type: MatrixActionTypes.CELL__MOUSE__ENTER
    payload: number
}
interface ResetClosest {
    type: MatrixActionTypes.RESET__CLOSEST
}
export type MatrixAction = AddMatrixRowAction | IncreaseDataRows | DeleteMatrixRow |
    ChangeMatrixData | ClickCell | CellMouseEnter | ResetClosest;
