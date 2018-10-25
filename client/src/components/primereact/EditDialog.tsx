import * as moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import * as React from 'react';
import './EditDialog.css';

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
  movie: IMovie;
  onHideEditDialog: () => void;
  getAllMovies: () => void;
  onDeleteMovie: (e: any) => void;
}

interface IEditDialogState {
  editMovie: IMovie;
}

class EditDialog extends React.Component<IEditDialogProps, IEditDialogState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editMovie: {
        _id: '',
        title: '',
        year: '',
        duration: '',
        releaseDate: '',
        poster: '',
        genres: []
      }
    };
    this.updateMovie = this.updateMovie.bind(this);
    this.changeReleaseDate = this.changeReleaseDate.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onGanresChange = this.onGanresChange.bind(this);
    this.onClearForm = this.onClearForm.bind(this);
  }

  public render() {
    return (
      <Dialog
        header="Информация о фильме"
        visible={this.props.visible}
        width="700px"
        modal={true}
        onHide={this.props.onHideEditDialog}
      >
        {this.renderDialogEdit()}
      </Dialog>
    );
  }

  private changeReleaseDate(e: any) {
    let date;
    if (e.target && e.target.nodeName === 'INPUT') {
      date = new Date(e.target.value);
    } else {
      date = new Date(e.value);
    }

    const releaseDate = String(moment(date).format('YYYY-MM-DD'));
    const year = String(date.getFullYear());

    this.setState(state => ({
      editMovie: {
        ...state.editMovie,
        releaseDate,
        year
      }
    }));
  }

  private updateMovie(e: any) {
    e.preventDefault();
    fetch('/api/movies', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldData: this.props.movie,
        newData: this.state.editMovie
      })
    })
      .then(() => this.props.getAllMovies())
      .then(() => this.props.onHideEditDialog())
      .then(() =>
        this.setState({
          editMovie: {
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

  private renderDialogEdit(): any {
    const genresList = [
      { label: 'Action', value: 'Action' },
      { label: 'Horror', value: 'Horror' },
      { label: 'Adventure', value: 'Adventure' },
      { label: 'Drama', value: 'Drama' },
      { label: 'Comedy', value: 'Comedy' },
      { label: 'Art-house', value: 'Art-house' }
    ];
    const { movie } = this.props;
    const { editMovie } = this.state;

    if (movie) {
      const poster = movie.poster ? movie.poster : 'defaultPoster.jpeg';

      return (
        <form onSubmit={this.updateMovie} className="EditDialog--form">
          <section className="EditDialog--content">
            <section className="EditDialog--dataOnServer">
              <h2>Данные в базе</h2>
              <img alt={movie.title} src={'img/' + poster} /> <br />
              <div>Название: {movie.title}</div>
              <div>Продолжительность: {movie.duration}</div>
              <div>Дата релиза: {movie.releaseDate}</div>
              <div>
                Жанры:{' '}
                {movie.genres
                  ? movie.genres.map((item, index) => (
                      <span key={index}>{(index ? ', ' : '') + item}</span>
                    ))
                  : ''}
              </div>
            </section>

            <section className="EditDialog--localData">
              <h2>Изменить значения</h2>
              <span className="p-float-label">
                <InputText
                  id="title"
                  className="EditDialog--title"
                  value={editMovie.title}
                  onChange={this.onTitleChange}
                />
                <label htmlFor="title">Название фильма</label>
              </span>
              <div className="EditDialog--duration">
                <h3>Продолжительность: {editMovie.duration} мин.</h3>
                <Slider
                  id="duration"
                  value={Number(editMovie.duration)}
                  min={0}
                  max={400}
                  onChange={this.onDurationChange}
                />
              </div>
              <div className="EditDialog--calendar">
                <h3>Дата релиза</h3>
                <Calendar
                  className="EditDialog--calendarInput"
                  id="releade-date"
                  dateFormat="yy-mm-dd"
                  value={
                    this.state.editMovie.releaseDate
                      ? moment(
                          this.state.editMovie.releaseDate,
                          'YYYY-MM-DD'
                        ).toDate()
                      : new Date()
                  }
                  onChange={this.changeReleaseDate}
                />
              </div>
              <div className="EditDialog--genres">
                <MultiSelect
                  className="EditDialog--genresInput"
                  defaultLabel="Выберите жанр"
                  value={editMovie.genres}
                  options={genresList}
                  onChange={this.onGanresChange}
                />
              </div>
              <div className="EditDialog--btnContainer">
                <Button
                  icon="pi pi-times"
                  label="Очистить форму"
                  onClick={this.onClearForm}
                />
                <Button
                  id="delete-movie"
                  icon="pi pi-trash"
                  label="Удалить"
                  onClick={this.props.onDeleteMovie}
                />
              </div>
            </section>
          </section>

          <div className="EditDialog--sendBtn">
            <Button
              icon="pi pi-refresh"
              type="submit"
              label="Обновить данные на сервере"
            />
          </div>
        </form>
      );
    }
  }

  private onClearForm = (e: any) => {
    e.preventDefault();
    this.setState({
      editMovie: {
        _id: '',
        title: '',
        year: '',
        duration: '',
        releaseDate: '',
        poster: '',
        genres: []
      }
    });
  };

  private onGanresChange = (e: any) => {
    this.setState(prevState => ({
      editMovie: { ...prevState.editMovie, genres: e.value }
    }));
  };

  private onTitleChange = (e: any) => {
    const title = e.target.value;
    this.setState(state => ({
      editMovie: { ...state.editMovie, title }
    }));
  };

  private onDurationChange = (e: any) => {
    const duration = String(e.value);
    this.setState(state => ({
      editMovie: { ...state.editMovie, duration }
    }));
  };
}

export default EditDialog;
