import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WeatherApp } from './Components/WeatherApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <WeatherApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
