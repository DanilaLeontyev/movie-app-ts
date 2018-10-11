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
  editMovie: IMovie;
  handleCancel: (e: any) => void;
  onEditMovieTitle: (e: any) => void;
}

class EditDialog extends React.Component<IEditDialogProps> {
  constructor(props: IEditDialogProps) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  
  public render() {
    const { visible, editMovie, handleCancel } = this.props;
    return (
      <Modal
        title="Редактировать информацию о фильме"
        visible={visible}
        onCancel={handleCancel}
      >
        <section>
          <h2>Данные на сервере</h2>
          <div>Название фильма: {editMovie.title}</div>
        </section>
        <Input value={editMovie.title} onChange={this.handleTitleChange} />
      </Modal>
    );
  }

  private handleTitleChange(e: any) {
    this.props.onEditMovieTitle(e.target.value);
  }
}
export default EditDialog;
