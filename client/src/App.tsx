import { Button, Table, Tag } from 'antd';
import * as React from 'react';
import './App.css';
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
  editMovie: IMovie;
}

class App extends React.Component<any, IAppState> {
  private columns: any = [
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
          {genres.map(genre => (
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
            <Button type="danger">Удалить</Button>
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

    this.getAllMovies = this.getAllMovies.bind(this);
    this.showEditDialog = this.showEditDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  public componentDidMount(): void {
    this.getAllMovies();
  }

  public render() {
    const columns = this.columns;
    const { movies, visibleEditDialog, editMovie } = this.state;
    return (
      <div className="App">
        <Table
          columns={columns}
          rowKey="_id"
          dataSource={movies}
          pagination="bottom"
        />
        <EditDialog
          editMovie={editMovie}
          visible={visibleEditDialog}
          handleCancel={this.hideDialog}
        />
      </div>
    );
  }

  private getAllMovies(): void {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => this.setState({ movies: data }));
  }

  // Чтобы не применять стрелочную функцию применяем каррирование
  private showEditDialog = (movie: IMovie) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    this.setState({
      visibleEditDialog: true,
      editMovie: movie
    });
  };

  private hideDialog(): void {
    this.setState({
      visibleEditDialog: false
    });
  }
}

export default App;
