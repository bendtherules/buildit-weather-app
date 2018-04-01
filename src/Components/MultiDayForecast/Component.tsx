import * as React from 'react';
import '../../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import './Component.css';
import { Forecast5Days, ForecaseAtInstance } from '../WeatherApp';
import { SingleDayForecast } from '../SingleDayForecast';
import { Utils } from '../../Utils';

export interface MultiDayForecastProps {
  forecast5Days: Forecast5Days;
}

export interface MultiDayForecastState {
  forecastDay1: Array<ForecaseAtInstance>;
  forecastDay2: Array<ForecaseAtInstance>;
  forecastDay3: Array<ForecaseAtInstance>;
  forecastDay4: Array<ForecaseAtInstance>;
  forecastDay5: Array<ForecaseAtInstance>;
}

export class MultiDayForecast extends React.Component<MultiDayForecastProps, MultiDayForecastState> {

  constructor(props: MultiDayForecastProps) {
    super(props);

    this.state = this.extractStateFromProps(props);
  }

  componentWillReceiveProps(nextProps: MultiDayForecastProps) {
    var nextState = this.extractStateFromProps(nextProps);

    this.setState(nextState);
  }

  extractStateFromProps(props: MultiDayForecastProps): MultiDayForecastState {
    const tempState: MultiDayForecastState = {
      forecastDay1: [],
      forecastDay2: [],
      forecastDay3: [],
      forecastDay4: [],
      forecastDay5: [],
    };

    const day1 = Utils.createTodayDateInIndiaTZ(),
      day2 = day1.clone().add(1, 'd'),
      day3 = day1.clone().add(2, 'd'),
      day4 = day1.clone().add(3, 'd'),
      day5 = day1.clone().add(4, 'd');

    props.forecast5Days.list.forEach((forecastAtInstanceValue) => {
      const forecastDay = Utils.createDateFromEpochInIndiaTZ(forecastAtInstanceValue.dt);

      if (Utils.checkSameDayInSameTZ(forecastDay, day1)) {
        tempState.forecastDay1.push(forecastAtInstanceValue);
      } else if (Utils.checkSameDayInSameTZ(forecastDay, day2)) {
        tempState.forecastDay2.push(forecastAtInstanceValue);
      } else if (Utils.checkSameDayInSameTZ(forecastDay, day3)) {
        tempState.forecastDay3.push(forecastAtInstanceValue);
      } else if (Utils.checkSameDayInSameTZ(forecastDay, day4)) {
        tempState.forecastDay4.push(forecastAtInstanceValue);
      } else if (Utils.checkSameDayInSameTZ(forecastDay, day5)) {
        tempState.forecastDay5.push(forecastAtInstanceValue);
      } else {
        // Because it is rolling 5 days, last few times can fall into (today + 5) th day
        // Just skip those values
      }

    });

    return tempState;
  }

  render() {
    return (
      <div className="MultiDayForecast">
        <SingleDayForecast forecastDay={this.state.forecastDay1} />
        <SingleDayForecast forecastDay={this.state.forecastDay2} />
        <SingleDayForecast forecastDay={this.state.forecastDay3} />
        <SingleDayForecast forecastDay={this.state.forecastDay4} />
        <SingleDayForecast forecastDay={this.state.forecastDay5} />
      </div>
    );
  }
}
