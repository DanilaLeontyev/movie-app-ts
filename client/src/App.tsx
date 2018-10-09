import { Button, Table, Tag } from 'antd';
import * as React from 'react';
import './App.css';

interface IMovie {
  _id: string;
  title: string;
  year: string;
  duration: string;
  releaseDate: string;
  poster: string;
  genres: string[];
}

interface IState {
  movies: IMovie[];
  editingMovie: string;
}

class App extends React.Component<any, IState> {
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
        const editable: boolean = this.isEditing(movie);
        const ButtonGroup = Button.Group;
        return (
          <div>
            {editable ? (
              <div>Cant edit</div>
            ) : (
              <ButtonGroup>
                <Button type="primary">Редактировать</Button>
                <Button type="danger">Удалить</Button>
              </ButtonGroup>
            )}
          </div>
        );
      }
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      editingMovie: ''
    };
    this.getAllMovies = this.getAllMovies.bind(this);
  }

  public getAllMovies(): void {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => this.setState({ movies: data }));
  }

  public componentDidMount(): void {
    this.getAllMovies();
  }

  public render() {
    const columns = this.columns;
    const { movies } = this.state;
    return (
      <div className="App">
        <Table columns={columns} dataSource={movies} pagination="bottom" />
      </div>
    );
  }

  // private edit = (movie: IMovie) => {
  //   this.setState({
  //     editingMovie: movie._id
  //   });
  // };

  private isEditing = (movie: IMovie) => {
    return movie._id === this.state.editingMovie;
  };
}

export default App;
