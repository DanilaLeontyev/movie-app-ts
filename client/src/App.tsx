import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import * as React from 'react';
import './App.css';
import MovieTableANT from './components/antd/MovieTable';
import MovieTable from './components/primereact/MovieTable';

interface IAppState {
  design: string;
}

class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      design: 'PrimeReact'
    };

    this.switchLibrary = this.switchLibrary.bind(this);
  }

  public render() {
    return (
      <div>
        <header className="siteHeader">
          <img
            className="header-logo"
            src={`img/${this.state.design}.png`}
            alt="logo"
          />
          <h1>Фильмотека</h1>
          <button className="switchButton" onClick={this.switchLibrary}>
            {this.state.design}
          </button>
        </header>
        {this.state.design === 'PrimeReact' && <MovieTable />}
        {this.state.design === 'antDesign' && <MovieTableANT />}
      </div>
    );
  }

  private switchLibrary(e: any) {
    if (this.state.design === 'PrimeReact') {
      this.setState({
        design: 'antDesign'
      });
    } else {
      this.setState({
        design: 'PrimeReact'
      });
    }
  }
}

export default App;
