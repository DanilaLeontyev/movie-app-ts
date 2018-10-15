import { DatePicker, Form, Input, Modal } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import './EditDialog.css';

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
    this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this);
  }

  public render() {
    const { visible, selectedMovie } = this.props;
    return (
      <Modal
        className="EditDialog"
        title="Редактировать информацию о фильме"
        visible={visible}
        onCancel={this.onHandleCancel}
      >
        <div className="EditDialog--content">
          <section className="serverData">
            <h2>Данные на сервере</h2>
            <div>Название фильма: {selectedMovie.title}</div>
            <div>Дата релиза: {selectedMovie.releaseDate}</div>
            <div>Год выхода: {selectedMovie.year}</div>
            <div>Продолжительность: {selectedMovie.duration}</div>
          </section>
          <Form className="inputData">
            <h2>Изменить данные</h2>
            <FormItem>
              <Input
                type="text"
                placeholder="Название фильма"
                value={this.state.editedMovie.title}
                onChange={this.handleTitleChange}
              />
            </FormItem>
            <FormItem>
              <DatePicker onChange={this.handleReleaseDateChange} />
            </FormItem>
          </Form>
        </div>
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

  private handleReleaseDateChange(e: any) {
    const releaseDate = moment(e).format('YYYY-MM-DD');
    this.setState(state => ({
      editedMovie: { ...state.editedMovie, releaseDate }
    }));
  }
}
export default EditDialog;
