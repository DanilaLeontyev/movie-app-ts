import { Input, Modal } from 'antd';
import * as React from 'react';

interface IMovie {
  _id: string;
  title: string;
  year: string;
  duration: string;
  releaseDate: string;
  poster: string;
  genres: string[];
}

interface IEditDialogProps {
  visible: boolean;
  editedMovie: IMovie;
  selectedMovie: IMovie;
  handleCancel: (e: any) => void;
  onEditMovieTitle: (e: any) => void;
}

class EditDialog extends React.Component<IEditDialogProps> {
  constructor(props: IEditDialogProps) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  public render() {
    const { visible, editedMovie, handleCancel, selectedMovie } = this.props;
    return (
      <Modal
        title="Редактировать информацию о фильме"
        visible={visible}
        onCancel={handleCancel}
      >
        <section>
          <h2>Данные на сервере</h2>
          <div>Название фильма: {selectedMovie.title}</div>
          <div>Дата релиза: {selectedMovie.releaseDate}</div>
          <div>Год выхода: {selectedMovie.year}</div>
          <div>Продолжительность: {selectedMovie.duration}</div>
        </section>
        <section>
          <Input value={editedMovie.title} onChange={this.handleTitleChange} />
        </section>
      </Modal>
    );
  }

  private handleTitleChange(e: any) {
    this.props.onEditMovieTitle(e.target.value);
  }
}
export default EditDialog;
