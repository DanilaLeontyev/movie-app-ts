import {
  Button,
  DatePicker,
  Form,
  Icon,
  Input,
  Modal,
  Select,
  Slider,
  Upload
} from 'antd';
import * as moment from 'moment';
import 'moment/locale/ru';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const genres: string[] = ['Drama', 'Sci-fi', 'Comedy'];

interface IAddDialogProps {
  visible: boolean;
  handleCancel: (e: any) => void;
  refreshData: () => void;
}

interface IAddDialogState {
  movie: any;
}

class AddDialog extends React.Component<IAddDialogProps, IAddDialogState> {
  constructor(props: IAddDialogProps) {
    super(props);

    this.state = {
      movie: {}
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onHandleCancel = this.onHandleCancel.bind(this);
    this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleGanresChange = this.handleGanresChange.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  public render() {
    const { visible } = this.props;
    return (
      <Modal
        className="EditDialog"
        title="Редактировать информацию о фильме"
        visible={visible}
        onCancel={this.onHandleCancel}
      >
        <Form className="inputData">
          <h2>Изменить данные</h2>
          <FormItem>
            <Input
              type="text"
              placeholder="Название фильма"
              value={this.state.movie.title}
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
          <FormItem>
            <Upload
              name="poster"
              action="/upload"
              accept="image/*"
              url={`img/${this.state.movie.poster}`}
              thumbUrl={`img/${this.state.movie.poster}`}
              onChange={this.handleUpload}
              listType="picture"
            >
              <Button>
                <Icon type="upload" /> Загрузить постер
              </Button>
            </Upload>
          </FormItem>
          <Button type="submit" onClick={this.addMovie}>
            Отправить на сервер
          </Button>
        </Form>
      </Modal>
    );
  }

  private handleUpload(info: any) {
    if (info.file.status === 'done') {
      const poster = info.file.response;
      this.setState(state => ({
        movie: { ...state.movie, poster }
      }));
    }
  }

  private addMovie(e: any) {
    fetch('/api/movies', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movie: this.state.movie })
    })
      .then(this.onHandleCancel)
      .then(this.props.refreshData);
  }

  private onHandleCancel(e: any) {
    this.props.handleCancel(e);
    this.setState({
      movie: {}
    });
  }

  private handleGanresChange(e: any) {
    const genresList = e;
    this.setState(state => ({
      movie: { ...state.movie, genresList }
    }));
  }

  private handleTitleChange(e: any) {
    const title = e.target.value;
    this.setState(state => ({
      movie: { ...state.movie, title }
    }));
  }

  private handleReleaseDateChange(e: any) {
    const releaseDate = moment(e).format('YYYY-MM-DD');
    const year = moment(e).format('YYYY');
    this.setState(state => ({
      movie: { ...state.movie, releaseDate, year }
    }));
  }

  private handleDurationChange(e: any) {
    const duration = e;
    this.setState(state => ({
      movie: { ...state.movie, duration }
    }));
  }
}

export default AddDialog;
