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
  selectedMovie: IMovie;
  handleCancel: (e: any) => void;
}

interface IEditDialogState {
  editedMovie: any;
}

class EditDialog extends React.Component<IEditDialogProps, IEditDialogState> {
  constructor(props: IEditDialogProps) {
    super(props);
    this.state = {
      editedMovie: {}
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onHandleCancel = this.onHandleCancel.bind(this);
  }

  public render() {
    const { visible, selectedMovie } = this.props;
    return (
      <Modal
        title="Редактировать информацию о фильме"
        visible={visible}
        onCancel={this.onHandleCancel}
      >
        <section>
          <h2>Данные на сервере</h2>
          <div>Название фильма: {selectedMovie.title}</div>
          <div>Дата релиза: {selectedMovie.releaseDate}</div>
          <div>Год выхода: {selectedMovie.year}</div>
          <div>Продолжительность: {selectedMovie.duration}</div>
        </section>
        <section>
          <Input
            value={this.state.editedMovie.title}
            onChange={this.handleTitleChange}
          />
        </section>
      </Modal>
    );
  }

  private handleTitleChange(e: any) {
    const title = e.target.value;
    this.setState(state => ({
      editedMovie: { ...state.editedMovie, title }
    }));
  }

  private onHandleCancel(e: any) {
    this.props.handleCancel(e);
    this.setState({
      editedMovie: {}
    });
  }
}
export default EditDialog;
