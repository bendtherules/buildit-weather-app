import * as React from 'react';
import '../../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import './Component.css';

import { SingleDayForecast } from '../SingleDayForecast';
import { Utils, Forecast5DaysMixed, Forecast5DaysSeperated } from '../../Utils';

export interface MultiDayForecastProps {
  forecast5DaysMixed: Forecast5DaysMixed;
}

export interface MultiDayForecastState {
  forecast5DaysSeperated: Forecast5DaysSeperated;
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
      forecast5DaysSeperated: {
        forecastDay1: [],
        forecastDay2: [],
        forecastDay3: [],
        forecastDay4: [],
        forecastDay5: [],
      }
    };

    const forecast5DaysSeperated = tempState.forecast5DaysSeperated;

    const day1 = Utils.createTodayDateInIndiaTZ(),
      day2 = day1.clone().add(1, 'd'),
      day3 = day1.clone().add(2, 'd'),
      day4 = day1.clone().add(3, 'd'),
      day5 = day1.clone().add(4, 'd');

    props.forecast5DaysMixed.list.forEach((forecastAtInstanceValue) => {
      const forecastDay = Utils.createDateFromEpochInIndiaTZ(forecastAtInstanceValue.dt);

      if (Utils.checkSameDayInSameTZ(forecastDay, day1)) {

        forecast5DaysSeperated.forecastDay1.push(forecastAtInstanceValue);

      } else if (Utils.checkSameDayInSameTZ(forecastDay, day2)) {

        forecast5DaysSeperated.forecastDay2.push(forecastAtInstanceValue);

      } else if (Utils.checkSameDayInSameTZ(forecastDay, day3)) {

        forecast5DaysSeperated.forecastDay3.push(forecastAtInstanceValue);

      } else if (Utils.checkSameDayInSameTZ(forecastDay, day4)) {

        forecast5DaysSeperated.forecastDay4.push(forecastAtInstanceValue);

      } else if (Utils.checkSameDayInSameTZ(forecastDay, day5)) {

        forecast5DaysSeperated.forecastDay5.push(forecastAtInstanceValue);

      } else {
        // Because it is rolling 5 days, last few times can fall into (today + 5) th day
        // Just skip those values
      }

    });

    return tempState;
  }

  render() {
    const forecast5DaysSeperated = this.state.forecast5DaysSeperated;

    return (
      <div className="MultiDayForecast">
        <SingleDayForecast
          forecastCurrentDay={forecast5DaysSeperated.forecastDay1}
          forecast5DaysSeperated={forecast5DaysSeperated}
        />
        <SingleDayForecast
          forecastCurrentDay={forecast5DaysSeperated.forecastDay2}
          forecast5DaysSeperated={forecast5DaysSeperated}
        />
        <SingleDayForecast
          forecastCurrentDay={forecast5DaysSeperated.forecastDay3}
          forecast5DaysSeperated={forecast5DaysSeperated}
        />
        <SingleDayForecast
          forecastCurrentDay={forecast5DaysSeperated.forecastDay4}
          forecast5DaysSeperated={forecast5DaysSeperated}
        />
        <SingleDayForecast
          forecastCurrentDay={forecast5DaysSeperated.forecastDay5}
          forecast5DaysSeperated={forecast5DaysSeperated}
        />
      </div>
    );
  }
}
