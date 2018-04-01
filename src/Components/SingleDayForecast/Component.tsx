import * as React from 'react';
import * as classnames from 'classnames';
import './Component.css';
import '../../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import { Forecast5DaysSeperated, ForecaseAtInstance, Utils } from '../../Utils';
import { SingleInstanceForecast } from '../SingleInstanceForecast';

export interface SingleDayForecastProps {
  forecastCurrentDay: Array<ForecaseAtInstance>;
  forecast5DaysSeperated: Forecast5DaysSeperated;
}

type numberOrString = number | string;

export class SingleDayForecast extends React.Component<SingleDayForecastProps,
  { maximized: boolean, maximizedInitial: boolean }
  > {

  constructor(props: SingleDayForecastProps) {
    super(props);

    this.props = props;
    this.state = { maximized: true, maximizedInitial: true };

    this.minimizeIfAlreadyMaximized = this.minimizeIfAlreadyMaximized.bind(this);
    this.maximizeIfAlreadyMinimized = this.maximizeIfAlreadyMinimized.bind(this);

    // this.state = { data: undefined };
  }

  componentWillUpdate(nextProps: SingleDayForecastProps) {
    this.props = this.props;
  }

  calcSummary(): {
    avgTemp: number,
    avgHumidity: number,
    modeWeatherDescription: string,
    modeWeatherIcon: string
  } {
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

    const allWeatherDescriptions = this.props.forecastCurrentDay.map(
      (forecastInstance) =>
        forecastInstance.weather[0].description
    );

    const allWeatherIcons = this.props.forecastCurrentDay.map(
      (forecastInstance) =>
        forecastInstance.weather[0].icon
    );

    const modeWeatherDescription = this.mode(allWeatherDescriptions) as string;
    const modeWeatherIcon = this.mode(allWeatherIcons) as string;

    return { avgTemp, avgHumidity, modeWeatherDescription, modeWeatherIcon };
  }

  mode<T extends numberOrString>(elements: Array<T>): T | null {
    if (elements.length === 0) {
      return null;
    }

    var modeMap: { [key: string]: number } = {};

    var maxEl = elements[0], maxCount = 0;

    for (var i = 0; i < elements.length; i++) {
      const tmpElement = elements[i];
      const tmpElementString = tmpElement.toString();

      modeMap[tmpElementString] = (modeMap[tmpElementString] || 0) + 1;

      if (modeMap[tmpElementString] > maxCount) {
        maxEl = tmpElement;
        maxCount = modeMap[tmpElementString];
      }
    }
    return maxEl;
  }

  changeMaximize() {
    this.setState((prevState) => { return { maximized: !prevState.maximized, maximizedInitial: false }; });
  }

  maximizeIfAlreadyMinimized() {
    if (!this.state.maximized) {
      this.changeMaximize();
    }
  }

  minimizeIfAlreadyMaximized() {
    if (this.state.maximized) {
      this.changeMaximize();
    }
  }

  calcMainTagClassnames(): string {
    const MainTagName = 'SingleDayForecast';
    const allClassNames = [MainTagName];

    if (this.state.maximized) {
      allClassNames.push('maximized');
    }
    if (this.state.maximizedInitial) {
      allClassNames.push('maximized-initial');
    }

    return classnames(allClassNames);
  }

  render() {
    const day = Utils.createDateFromEpochInIndiaTZ(this.props.forecastCurrentDay[0].dt);
    const summary = this.calcSummary();

    return (
      <div className={this.calcMainTagClassnames()}>
        <div className="SingleDayForecast-inner" onClick={this.minimizeIfAlreadyMaximized}>
          <div className="summary" onClick={this.maximizeIfAlreadyMinimized}>

            <div className="weather-icon-container">
              <div className={`weather-icon owi owi-3x owi-${summary.modeWeatherIcon}`} />
            </div>

            <div className="date">
              {day.format('Do MMM')}
            </div>

            <div className="weather-description">
              {Utils.stringToNormalCase(summary.modeWeatherDescription)}
            </div>

            <div className="temp" title={`Temperature : ${summary.avgTemp.toFixed(0)}°C`}>
              <div className="desc">
                T :
              </div>
              <div className="value">
                {summary.avgTemp.toFixed(0)}&deg;C
              </div>
              <div className="clearfix" />
            </div>

            <div className="humidity" title={`Humidity : ${summary.avgHumidity.toFixed(0)} %`}>
              <div className="desc">
                H :
              </div>
              <div className="value">
                {summary.avgHumidity.toFixed(0)} %
              </div>
              <div className="clearfix" />
            </div>

            <div className="bottom-dividor" />
          </div>
          <div className="details">
            {this.props.forecastCurrentDay.map((forecastAtInstance) => {
              return <SingleInstanceForecast forecastAtInstance={forecastAtInstance} key={forecastAtInstance.dt} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
