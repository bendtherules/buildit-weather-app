import * as React from 'react';
import './Component.css';
import '../../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import { ForecaseAtInstance, Utils } from '../../Utils';

export interface SingleInstanceForecastProps {
  forecastAtInstance: ForecaseAtInstance;
}

export class SingleInstanceForecast extends React.Component<SingleInstanceForecastProps, {}> {

  constructor(props: SingleInstanceForecastProps) {
    super(props);

    this.props = props;

    // this.state = { data: undefined };
  }

  componentWillUpdate(nextProps: SingleInstanceForecastProps) {
    this.props = this.props;
  }

  render() {
    const day = Utils.createDateFromEpochInIndiaTZ(this.props.forecastAtInstance.dt);
    const forecastAtInstance = this.props.forecastAtInstance;
    const defaultWeather = forecastAtInstance.weather[0];

    return (
      <div className="SingleInstanceForecast">
        <div className="date">
          At {day.format('h A')}
        </div>

        <div className="weather-icon-container">
          <div className={`weather-icon owi owi-2x owi-${defaultWeather.icon}`} />
        </div>

        <div className="weather-description">
          {Utils.stringToNormalCase(defaultWeather.description)}
        </div>

        <div className="temp" title={`Temperature : ${forecastAtInstance.main.temp.toFixed(0)}°C`}>
          
          <div className="temp-value">
            {forecastAtInstance.main.temp.toFixed(0)}&deg;C
          </div>
          <div className="clearfix" />
        </div>

        <div className="humidity" title={`Humidity : ${forecastAtInstance.main.humidity.toFixed(0)} %`}>
          
          <div className="humidity-value">
            {forecastAtInstance.main.humidity.toFixed(0)} %
          </div>
          <div className="clearfix" />
        </div>

        <div className="bottom-dividor" />
      </div>
    );
  }
}
