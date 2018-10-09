import { Table } from 'antd';
import * as React from 'react';
import './App.css';

interface IMovie {
  id: string;
  title: string;
  year: string;
  releaseDate: string;
  poster: string;
  genres: string[];
}

interface IState {
  movies: IMovie[];
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
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      movies: []
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
}

export default App;
