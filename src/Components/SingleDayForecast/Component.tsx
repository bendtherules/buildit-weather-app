import * as React from 'react';
import './Component.css';
import { ForecaseAtInstance } from '../WeatherApp';

export interface SingleDayForecastProps {
  forecastDay: Array<ForecaseAtInstance>;
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

  render() {
    return (
      <div className="SingleDayForecast">
        {JSON.stringify(this.props)};
      </div>
    );
  }
}
