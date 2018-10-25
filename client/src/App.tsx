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
      design: 'primeReact'
    };

    this.switchLibrary = this.switchLibrary.bind(this);
  }

  public render() {
    return (
      <div>
        <button onClick={this.switchLibrary}>{this.state.design}</button>
        {this.state.design === 'primeReact' && <MovieTable />}
          {this.state.design === 'antDesign' && <MovieTableANT />}
        </div>
    );
  }

  private switchLibrary(e: any) {
    if (this.state.design === 'primeReact') {
      this.setState({
        design: 'antDesign'
      });
    } else {
      this.setState({
        design: 'primeReact'
      });
    }
  }
}

export default App;
