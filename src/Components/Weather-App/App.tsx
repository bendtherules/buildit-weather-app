import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

export interface ForecaseAtInstance {
  dt: Number;
  main: {
    temp: Number;
    temp_min: Number;
    temp_max: Number;
    pressure: Number;
    sea_level: Number;
    grnd_level: Number;
    humidity: Number;
    temp_kf: Number;
  };

  weather: [{
    id: Number;
    main: string; // Make enum
    description: string;
    icon: string;
  }];

  clouds: {
    all: Number;
  };

  wind: {
    speed: Number;
    deg: Number;
  };

  dt_txt: string;
}

export interface Forecast5Days {
  cnt: Number;
  list: Array<ForecaseAtInstance>;
}

export class WeatherApp extends React.Component {
  data: Forecast5Days | undefined = undefined;

  componentDidMount() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=kolkata&appid=d65cee3c5866168080fa1c4177fdb4a8')
      .then((response) => {
        return response.json();
      })
      .then((responseObject) => {
        this.data = responseObject as Forecast5Days;
      });
  }

  isDataLoaded():this.data is Forecast5Days {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        {this.data!==undefined ? }
      </div>
    );
  }
}
