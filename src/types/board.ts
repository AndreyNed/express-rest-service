import IBoardColumn from './board-column';

interface IBoard {
  id: string;
  title: string;
  columns: IBoardColumn[] | [];
}

export default IBoard;
