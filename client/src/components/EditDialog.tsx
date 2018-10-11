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
  onEditMovieTitle: (title: string) => void;
}

class EditDialog extends React.Component<IEditDialogProps> {
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
          <Input value={editedMovie.title} onChange={this.editMovie} />
        </section>
      </Modal>
    );
  }
  private editMovie = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onEditMovieTitle(e.target.value);
}
export default EditDialog;
