import { DatePicker, Form, Input, message, Modal, Select, Slider } from 'antd';
import * as moment from 'moment';
import 'moment/locale/ru';
import * as React from 'react';
import './EditDialog.css';

const FormItem = Form.Item;
const Option = Select.Option;

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
  updateMovieInState: (movie: IMovie) => void;
}

interface IEditDialogState {
  editedMovie: IMovie;
}

class EditDialog extends React.Component<IEditDialogProps, IEditDialogState> {
  constructor(props: IEditDialogProps) {
    super(props);

    this.state = {
      editedMovie: {
        _id: '',
        title: '',
        year: '',
        duration: '',
        releaseDate: '',
        poster: '',
        genres: []
      }
    };
  }

  public render() {
    const { visible, selectedMovie } = this.props;
    const genres: string[] = ['Drama', 'Sci-fi', 'Comedy'];
    return (
      <Modal
        className="EditDialog"
        title="Редактировать информацию о фильме"
        visible={visible}
        onCancel={this.onHandleCancel}
        destroyOnClose="true"
        onOk={this.updateMovie}
      >
        <div className="EditDialog--content">
          <section className="serverData">
            <h2>Данные на сервере</h2>
            <img
              className="serverData--poster"
              src={`img/${
                selectedMovie.poster
                  ? selectedMovie.poster
                  : 'defaultPoster.jpeg'
              }`}
              alt={selectedMovie.title}
            />
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
                onChange={this.handleTitleChange}
              />
            </FormItem>
            <FormItem>
              <DatePicker
                className="EditDialog--datepicker"
                placeholder="Дата релиза"
                onChange={this.handleReleaseDateChange}
              />
            </FormItem>
            <FormItem>
              <Slider min={0} max={400} onChange={this.handleDurationChange} />
            </FormItem>
            <FormItem>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                onChange={this.handleGanresChange}
                tokenSeparators={[',']}
              >
                {genres.map(genre => (
                  <Option key={genre}>{genre}</Option>
                ))}
              </Select>
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }

  private updateMovie = (e: any) => {
    fetch('/api/movies', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldData: this.props.selectedMovie,
        newData: this.state.editedMovie
      })
    })
      .then(() => this.props.updateMovieInState(this.state.editedMovie))
      .then(() => message.success(`Фильм отредактирован успешно`))
      .catch(() => message.error(`Ошибка изменения фильма`));

    this.onHandleCancel(e);
  };

  private onHandleCancel = (e: any) => {
    this.props.handleCancel(e);
  };

  private handleGanresChange = (e: any) => {
    const genres = e;
    this.setState(state => ({
      editedMovie: { ...state.editedMovie, genres }
    }));
  };

  private handleTitleChange = (e: any) => {
    const title = e.target.value;
    this.setState(state => ({
      editedMovie: { ...state.editedMovie, title }
    }));
  };

  private handleReleaseDateChange = (e: any) => {
    const releaseDate = moment(e).format('YYYY-MM-DD');
    const year = moment(e).format('YYYY');
    this.setState(state => ({
      editedMovie: { ...state.editedMovie, releaseDate, year }
    }));
  };

  private handleDurationChange = (e: any) => {
    const duration = e;
    this.setState(state => ({
      editedMovie: { ...state.editedMovie, duration }
    }));
  };
}
export default EditDialog;
