import * as React from 'react';
import './Component.css';
import { Forecast5DaysSeperated, ForecaseAtInstance } from '../../Utils';

export interface SingleDayForecastProps {
  forecastCurrentDay: Array<ForecaseAtInstance>;
  forecast5DaysSeperated: Forecast5DaysSeperated;
}

export class SingleDayForecast extends React.Component<SingleDayForecastProps, {}> {

  constructor(props: SingleDayForecastProps) {
    super(props);

    this.props = props;

    // this.state = { data: undefined };
  }

  componentWillUpdate(nextProps: SingleDayForecastProps) {
    this.props = this.props;
  }

  calcSummary(): { avgTemp: number, avgHumidity: number } {
    let avgTemp: number, avgHumidity: number;
    {
      const sumTemp = this.props.forecastCurrentDay.reduce(
        (prevSum, currentForecast) => {
          return prevSum + currentForecast.main.temp;
        },
        0);

      const sumHumidity = this.props.forecastCurrentDay.reduce(
        (prevSum, currentForecast) => {
          return prevSum + currentForecast.main.humidity;
        },
        0);

      avgTemp = sumTemp / this.props.forecastCurrentDay.length;
      avgHumidity = sumHumidity / this.props.forecastCurrentDay.length;
    }

    return { avgTemp, avgHumidity };
  }

  render() {
    return (
      <div className="SingleDayForecast">
        <div className="forecast-summary">
          {JSON.stringify(this.calcSummary())};
        </div>
        <div className="forecast-details">
          BLANK
        </div>
      </div>
    );
  }
}
