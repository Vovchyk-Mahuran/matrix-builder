import { findClosestElements } from '../../helpers';
import { MatrixAction, MatrixActionTypes, MatrixState } from '../../types/matrix';

const initialValue: MatrixState = {
  matrix: [],
  data: { rows: 0, columns: 0, cells: 0 },
  closestElements: [],
};

// eslint-disable-next-line default-param-last
export const matrixReducer = (state = initialValue, action: MatrixAction): MatrixState => {
  switch (action.type) {
    case MatrixActionTypes.ADD__MATRIX__ROW:
      return {
        ...state,
        matrix: [...state.matrix, action.payload],
      };
    case MatrixActionTypes.INCREASE__DATA__ROWS:
      return { ...state, data: { ...state.data, rows: state.data.rows + 1 } };
    case MatrixActionTypes.DELETE__MATRIX__ROW:
      return {
        ...state,
        matrix: state.matrix.filter((item, idx) => idx !== action.payload),
        data: { ...state.data, rows: state.data.rows - 1 },
      };
    case MatrixActionTypes.CHANGE__MATRIX__DATA:
      return {
        ...state,
        data: { ...state.data, [action.payload.name]: +action.payload.value },
      };
    case MatrixActionTypes.CLICK__CELL:
      return {
        ...state,
        matrix: state.matrix.map((item) => item.map((n) => (n.id === action.payload
          ? { ...n, amount: n.amount + 1 }
          : n))),
      };
    case MatrixActionTypes.CELL__MOUSE__ENTER: {
      return {
        ...state,
        closestElements: findClosestElements(state.matrix, action.payload, state.data.cells) || [],
      };
    }
    case MatrixActionTypes.RESET__CLOSEST:
      return { ...state, closestElements: [] };
    default: return state;
  }
};
