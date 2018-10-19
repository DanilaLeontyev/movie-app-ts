import { Button, message, Table, Tag } from 'antd';
import * as React from 'react';
import './App.css';
import AddDialog from './components/AddDialog';
import EditDialog from './components/EditDialog';

interface IMovie {
  _id: string;
  title: string;
  year: string;
  duration: string;
  releaseDate: string;
  poster: string;
  genres: string[];
}

interface IAppState {
  movies: IMovie[];
  visibleEditDialog: boolean;
  visibleAddDialog: boolean;
  selectedMovie: IMovie;
}

class App extends React.Component<any, IAppState> {
  private columns: object = [
    {
      title: 'Постер',
      dataIndex: 'poster',
      key: 'poster',
      render: (posterURL: string, movie: IMovie) => (
        <img alt={movie.title} src={'/img/' + posterURL} height="150px" />
      )
    },
    {
      title: 'Название фильма',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Дата релиза',
      dataIndex: 'releaseDate',
      key: 'releaseDate'
    },
    {
      title: 'Жанры',
      dataIndex: 'genres',
      key: 'genres',
      render: (genres: string[]) => (
        <span>
          {genres &&
            genres.map(genre => (
              <Tag color="blue" key={genre}>
                {genre}
              </Tag>
            ))}
        </span>
      )
    },

    {
      title: 'Совершить действие',
      dataIndex: 'edit/delete',
      key: 'edit/delete',
      render: (text: string, movie: IMovie) => {
        const ButtonGroup = Button.Group;
        return (
          <ButtonGroup>
            <Button type="primary" onClick={this.showEditDialog(movie)}>
              Редактировать
            </Button>
            <Button type="danger" onClick={this.deleteMovie(movie)}>
              Удалить
            </Button>
          </ButtonGroup>
        );
      }
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      visibleEditDialog: false,
      visibleAddDialog: false,
      selectedMovie: {
        _id: '',
        title: '',
        year: '',
        duration: '',
        releaseDate: '',
        poster: '',
        genres: []
      }
    };

    this.getAllMovies = this.getAllMovies.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.showAddDialog = this.showAddDialog.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  public componentDidMount(): void {
    this.getAllMovies();
  }

  public render() {
    const columns = this.columns;
    const {
      movies,
      visibleEditDialog,
      selectedMovie,
      visibleAddDialog
    } = this.state;
    return (
      <div className="App">
        <h1>Американские фильмы</h1>
        <Button type="primary" onClick={this.showAddDialog}>
          Добавить новый фильм
        </Button>
        <Table
          columns={columns}
          rowKey="_id"
          dataSource={movies}
          pagination="bottom"
        />
        <EditDialog
          selectedMovie={selectedMovie}
          visible={visibleEditDialog}
          handleCancel={this.hideDialog}
          refreshData={this.getAllMovies}
        />

        <AddDialog
          visible={visibleAddDialog}
          handleCancel={this.hideDialog}
          refreshData={this.getAllMovies}
        />
      </div>
    );
  }

  public getAllMovies(): void {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => this.setState({ movies: data }))
      .then(() => message.success(`Данные загружены`))
      .catch(err => message.error(`Ошибка загрузки данных`));
  }

  private deleteMovie = (movie: IMovie) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    fetch('/api/movies', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movie })
    })
      .then(() => {
        const array: IMovie[] = [...this.state.movies];
        const index = array.indexOf(movie);
        array.splice(index, 1);
        this.setState({ movies: array });
      })
      .then(() => message.success(`Фильм ${movie.title} удален успешно`))
      .catch(() => message.error('Произошла ошибка'));
  };

  // Чтобы не применять стрелочную функцию применяем каррирование
  private showEditDialog = (movie: IMovie) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    this.setState({
      visibleEditDialog: true,
      selectedMovie: movie
    });
  };

  private showAddDialog(): void {
    this.setState({
      visibleAddDialog: true
    });
  }

  private hideDialog(): void {
    this.setState({
      visibleEditDialog: false,
      visibleAddDialog: false
    });
  }
}

export default App;
