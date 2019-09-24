import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gender: 'all'
    };

    this.getUserGender = this.getUserGender.bind(this);

  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('https://raw.githubusercontent.com/Adalab/rick-y-morty/master/data/rick-y-morty.json')
      .then(res=>res.json())
      .then(data => {

          this.setState({
            data: data.results
          })
      });
  }

  getUserGender(event) {
    const newGender = event.currentTarget.value;
    this.setState({
      gender: newGender
    });
  }

  render() {
    return (
      <div className="app">

        <select name="" id="" onChange={this.getUserGender}>
          <option value="all">All</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="unknown">Unknown</option>
        </select>

        <ul>
          <li><input type="radio" name="g" id="ga" value="all" onClick={this.getUserGender}/> All</li>
          <li><input type="radio" name="g" id="gf" value="Female" onClick={this.getUserGender}/> Female</li>
          <li><input type="radio" name="g" id="gm" value="Male" onClick={this.getUserGender}/> Male</li>
          <li><input type="radio" name="g" id="gu" value="unknown" onClick={this.getUserGender}/> Unknown</li>
        </ul>

        <ul>
          {this.state.data
            .filter(item => {
              if (this.state.gender === 'all') {
                return true;
              } else {
                
                if (this.state.gender === 'Male') {
                  return item.gender === 'Male';
                } else if (this.state.gender === 'Female') {
                  return item.gender === 'Female';
                } else {
                  return item.gender === 'unknown';
                }
              }
            })
            .map(item => {
              return (
                <li key={item.id}>
                  <div>{item.name}</div>
                  <div>{item.gender}</div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default App;
