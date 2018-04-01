import * as React from 'react';
// import * as moment from 'moment';
import '../../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import './App.css';
import { MultiDayForecast } from '../MultiDayForecast';

export interface ForecaseAtInstance {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };

  weather: [{
    id: number;
    main: string; // Make enum
    description: string;
    icon: string;
  }];

  clouds: {
    all: number;
  };

  wind: {
    speed: number;
    deg: number;
  };

  dt_txt: string;
}

export interface Forecast5Days {
  cnt: number;
  list: Array<ForecaseAtInstance>;
}

export interface WeatherDataState {
  data: Forecast5Days | undefined;
}

export class WeatherApp extends React.Component<{}, WeatherDataState> {

  constructor(props: {}) {
    super(props);

    this.state = { data: undefined };
  }

  componentDidMount() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=kolkata&appid=d65cee3c5866168080fa1c4177fdb4a8')
      .then((response) => {
        return response.json();
      })
      .then((responseObject) => {
        this.setState({ data: responseObject as Forecast5Days });
      });
  }

  renderLoading(): JSX.Element | string {
    return 'Still Loading';
  }

  renderDates(forecast5Days: Forecast5Days): JSX.Element | string {
    return <MultiDayForecast forecast5Days={forecast5Days} />;
  }

  render() {
    return (
      <div className="WeatherApp">
        <header className="WeatherApp-header">
          <div className="WeatherApp-title">
            Weather Forecast
          </div>
        </header>
        <div className="WeatherApp-body">
          {this.state.data !== undefined ? this.renderDates(this.state.data) : this.renderLoading()}
        </div>
      </div>
    );
  }
}
