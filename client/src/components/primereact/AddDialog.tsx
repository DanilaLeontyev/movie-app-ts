import * as moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import * as React from 'react';
// import { FileUpload } from 'primereact/fileupload';
import './AddDialog.css';

interface IMovie {
  _id: string;
  title: string;
  year: string;
  duration: string;
  releaseDate: string;
  poster: string;
  genres: string[];
}

interface IAddDialogProps {
  visible: boolean;
  onHideAddDialog: () => void;
  getAllMovies: () => void;
}

interface IAddDialogState {
  movie: IMovie;
}

class AddDialog extends React.Component<IAddDialogProps, IAddDialogState> {
  constructor(props: any) {
    super(props);
    this.state = {
      movie: {
        _id: '',
        title: '',
        year: '',
        duration: '',
        releaseDate: '',
        poster: '',
        genres: []
      }
    };

    this.changeReleaseDate = this.changeReleaseDate.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.sendPoster = this.sendPoster.bind(this);
  }

  public render() {
    return (
      <Dialog
        header="Добавить новый фильм"
        visible={this.props.visible}
        width="700px"
        modal={true}
        onHide={this.props.onHideAddDialog}
        className="AddDialog"
      >
        {this.renderAddMovieDialogContent()}
      </Dialog>
    );
  }

  private addMovie(e: any) {
    e.preventDefault();
    fetch('/api/movies', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movie: this.state.movie })
    })
      .then(() => this.props.getAllMovies())
      .then(() => this.props.onHideAddDialog())
      .then(() =>
        this.setState({
          movie: {
            _id: '',
            title: '',
            year: '',
            duration: '',
            releaseDate: '',
            poster: '',
            genres: []
          }
        })
      );
  }

  private sendPoster(e: any) {
    const files = e.files[0];
    const data = new FormData();
    data.append('poster', files);

    fetch('/upload', {
      method: 'post',
      body: data
    })
      .then(
        res => res.text() // if the response is a JSON object
      )
      .then(body =>
        this.setState(prevState => ({
          movie: {
            ...prevState.movie,
            poster: body
          }
        }))
      );
  }

  private changeReleaseDate(e: any) {
    let date;
    if (e.target && e.target.nodeName === 'INPUT') {
      date = new Date(e.target.value);
    } else {
      date = new Date(e.value);
    }

    const releaseDate = moment(date).format('YYYY-MM-DD');
    const year = String(date.getFullYear());

    this.setState(state => ({
      movie: {
        ...state.movie,
        releaseDate,
        year
      }
    }));
  }

  private onTitleChange = (e: any) => {
    const title = e.target.value;
    this.setState(state => ({
      movie: { ...state.movie, title }
    }));
  };

  private onDurationChange = (e: any) => {
    const duration = String(e.value);
    this.setState(state => ({
      movie: { ...state.movie, duration }
    }));
  };

  private renderAddMovieDialogContent() {
    const movie = this.state.movie;

    return (
      <form onSubmit={this.addMovie} className="p-grid AddDialog--form">
        <span className="p-float-label">
          <InputText
            id="title"
            className="AddDialog--title"
            value={movie.title}
            onChange={this.onTitleChange}
          />
          <label htmlFor="title">Название фильма</label>
        </span>

        <div className="AddDialog--duration">
          <h3>Продолжительность: {movie.duration} мин.</h3>
          <Slider
            id="duration"
            value={Number(movie.duration)}
            min={0}
            max={400}
            onChange={this.onDurationChange}
          />
        </div>

        {/* <FileUpload
          name="poster"
          url="/upload"
          accept="image/*"
          onSelect={this.sendPoster}
          chooseLabel="Прикрепить постер"
          mode="basic"
        /> */}

        <div className="AddDialog--calendar">
          <h3>Дата релиза</h3>
          <Calendar
            id="releade-date"
            dateFormat="yy-mm-dd"
            value={
              this.state.movie.releaseDate
                ? moment(this.state.movie.releaseDate, 'YYYY-MM-DD').toDate()
                : new Date()
            }
            onChange={this.changeReleaseDate}
          />
        </div>

        <Button
          className="AddDialog--btnSave"
          icon="pi pi-save"
          type="submit"
          label="Добавить в базу"
        />
      </form>
    );
  }
}

export default AddDialog;
