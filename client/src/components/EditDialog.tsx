import { Modal } from 'antd';
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
}

class EditDialog extends React.Component<IEditDialogProps> {
  public render() {
    return (
      <Modal
        title="Редактировать фильм"
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
      >
        <h2>Редактировать информацию о фильме</h2>
        {this.props.editMovie.title}
      </Modal>
    );
  }
}

export default EditDialog;
