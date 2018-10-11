import { Form, Icon, Input, Modal } from 'antd';
import * as React from 'react';

const FormItem = Form.Item;
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
        <section className="serverData">
          <h2>Данные на сервере</h2>
          <div>Название фильма: {selectedMovie.title}</div>
          <div>Дата релиза: {selectedMovie.releaseDate}</div>
          <div>Год выхода: {selectedMovie.year}</div>
          <div>Продолжительность: {selectedMovie.duration}</div>
        </section>
        <Form className="inputData">
          <FormItem>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Название фильма"
              value={this.state.editedMovie.title}
              onChange={this.handleTitleChange}
            />
          </FormItem>

          {/* <Input
            value={this.state.editedMovie.title}
            onChange={this.handleTitleChange}
          /> */}
        </Form>
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
