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
  }
  public render() {
    if (this.state.design === 'primeReact') {
      return <MovieTable />;
    }

    if (this.state.design === 'antDesign') {
      return <MovieTableANT />;
    }

    return <div>Что-то пошло не так</div>;
  }
}

export default App;
