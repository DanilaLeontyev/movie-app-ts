import { Table } from 'antd';
import * as React from 'react';
import './App.css';

class App extends React.Component<any, any> {
  public columns: any = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name'
    }
  ];

  public data: any = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
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

  public componentDidMount() {
    this.getAllMovies();
  }

  public render() {
    const columns = this.columns;
    const data = this.data;
    return (
      <div className="App">
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default App;
