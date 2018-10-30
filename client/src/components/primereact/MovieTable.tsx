import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';
import * as React from 'react';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import './MovieTable.css';

interface IMovie {
  _id: string;
  title: string;
  year: string;
  duration: string;
  releaseDate: string;
  poster: string;
  genres: string[];
}

interface IMovieTableState {
  movies: IMovie[];
  layout: string;
  visibleEdit: boolean;
  visibleAdd: boolean;
  visibleInfo: boolean;
  selectedMovie: IMovie;
  sortKey: string;
  sortOrder: number;
  sortField: string;
}

export class MovieTable extends React.Component<any, IMovieTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      layout: 'list',
      selectedMovie: {
        _id: '',
        title: '',
        year: '',
        duration: '',
        releaseDate: '',
        poster: '',
        genres: []
      },
      visibleInfo: false,
      visibleAdd: false,
      visibleEdit: false,
      sortKey: '',
      sortOrder: 0,
      sortField: ''
    };
  }

  public render() {
    const header = this.renderHeader();
    const rowsCount = 6;
    return (
      <div>
        <div className="content-section implementation">
          <DataView
            value={this.state.movies}
            layout={this.state.layout}
            header={header}
            itemTemplate={this.itemTemplate}
            paginatorPosition={'both'}
            paginator={true}
            rows={rowsCount}
            sortOrder={this.state.sortOrder}
            sortField={this.state.sortField}
          />
          {/* <InfoDialog
            visible={this.state.visibleInfo}
            movie={this.state.selectedMovie}
            onHideInfoDialog={this.hideDialog}
            onDeleteMovie={this.deleteMovie}
          /> */}
          <AddDialog
            visible={this.state.visibleAdd}
            onHideAddDialog={this.hideDialog}
            getAllMovies={this.getAllMovies}
          />
          <EditDialog
            visible={this.state.visibleEdit}
            movie={this.state.selectedMovie}
            onHideEditDialog={this.hideDialog}
            getAllMovies={this.getAllMovies}
            onDeleteMovie={this.deleteMovie}
          />
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    this.getAllMovies();
  }

  public componentDidUpdate(): void {
    if (
      this.state.visibleAdd ||
      this.state.visibleEdit ||
      this.state.visibleInfo
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  private getAllMovies = (): void => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => this.setState({ movies: data }));
  };

  private deleteMovie = (e: any): void => {
    e.preventDefault();
    fetch('/api/movies', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movie: this.state.selectedMovie })
    })
      .then(() => this.getAllMovies())
      .then(() => this.hideDialog());
  };

  private onSortChange = (e: any) => {
    const value = e.value;
    if (value.indexOf('!') === 0) {
      this.setState({
        sortOrder: -1,
        sortField: value.substring(1, value.length),
        sortKey: value
      });
    } else {
      this.setState({
        sortOrder: 1,
        sortField: value,
        sortKey: value
      });
    }
  };

  private hideDialog = () => {
    this.setState({
      visibleInfo: false,
      visibleAdd: false,
      visibleEdit: false
    });
  };

  private itemTemplate = (movie: IMovie, layout: string): any => {
    if (!movie) {
      return <div />; // Заглушка, чтобы при открытии последей страницы пагинации приложение не падало
    }

    if (layout === 'list') {
      return this.renderListItem(movie);
    } else {
      if (layout === 'grid') {
        return this.renderGridItem(movie);
      }
    }
  };

  private renderListItem = (movie: IMovie) => {
    const poster = movie.poster ? movie.poster : 'defaultPoster.jpeg';
    return (
      <div key={movie._id} className="Movie--item">
        <div className="Movie--info">
          <img alt="poster" src={'img/' + poster} height="100px" />
          <div className="Movie--details">
            <div>Название: {movie.title}</div>
            <div>Год выпуска: {movie.year}</div>
            <div>
              Жанры:{' '}
              {movie.genres
                ? movie.genres.map((item, index) => (
                    <span key={index}>{(index ? ', ' : '') + item}</span>
                  ))
                : ''}
            </div>
          </div>
        </div>

        <div className="Movie--buttonContainer">
          {/* <Button
              icon="pi pi-search"
              label="Просмотр"
              onClick={e =>
                this.setState({ selectedMovie: movie, visibleInfo: true })
              }
            /> */}

          <Button
            icon="pi pi-pencil"
            label="Редактировать"
            onClick={this.onEditButton(movie)}
          />
        </div>
      </div>
    );
  };

  private onEditButton = (movie: IMovie) => (e: any) => {
    this.setState({
      selectedMovie: movie,
      visibleEdit: true
    });
  };

  private onInfoButton = (movie: IMovie) => (e: any) => {
    this.setState({ selectedMovie: movie, visibleInfo: true });
  };

  private onShowAddDialog = (e: any) => {
    this.setState({ visibleAdd: true });
  };

  private onChangeLayer = (e: any) => {
    this.setState({ layout: e.value });
  };

  private renderGridItem = (movie: IMovie) => {
    return (
      <div
        key={movie._id}
        style={{ padding: '.5em' }}
        className="p-col-6 p-md-1"
      >
        <Panel header={movie.title} style={{ textAlign: 'center' }}>
          <div className="movie-detail">
            {movie.year} - {movie.genres}
          </div>

          <hr className="ui-widget-content" style={{ borderTop: 0 }} />
          <Button icon="pi pi-search" onClick={this.onInfoButton(movie)} />
        </Panel>
      </div>
    );
  };

  private renderHeader = () => {
    const sortOptions = [
      { label: 'Сначала новые', value: '!year' },
      { label: 'Сначала старые', value: 'year' }
    ];

    return (
      <section className="MovieTable--header">
        <Dropdown
          options={sortOptions}
          value={this.state.sortKey}
          placeholder="Сортировка"
          onChange={this.onSortChange}
        />
        <div className="MovieTable--addBtn">
          <Button
            label="Добавить новый"
            icon="pi pi-plus"
            onClick={this.onShowAddDialog}
          />
        </div>
        <DataViewLayoutOptions
          layout={this.state.layout}
          onChange={this.onChangeLayer}
        />
      </section>
    );
  };
}

export default MovieTable;
