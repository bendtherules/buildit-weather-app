import * as React from 'react';
// import * as moment from 'moment';
import '../../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import './App.css';
import { Forecast5DaysMixed } from '../../Utils';
import { MultiDayForecast } from '../MultiDayForecast';

export interface WeatherDataState {
  data: Forecast5DaysMixed | undefined;
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
        this.setState({ data: responseObject as Forecast5DaysMixed });
      });
  }

  renderLoading(): JSX.Element | string {
    return 'Still Loading';
  }

  renderDates(forecast5DaysMixed: Forecast5DaysMixed): JSX.Element | string {
    return <MultiDayForecast forecast5DaysMixed={forecast5DaysMixed} />;
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
