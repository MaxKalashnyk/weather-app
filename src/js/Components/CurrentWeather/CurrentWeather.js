import Component from '../../framework/Component';
import AppState from '../../../Services/AppState';
import { checkProperty } from '../../../Services/constants';
import { getcurrentDateString } from '../../../Services/constants';
import { getDayFromDateString } from '../../../Services/constants';
import { convertPressure } from '../../../Services/constants';
import { defineWindDirection } from '../../../Services/constants';
import { generateIconClass } from '../../../Services/constants';
import { convertTemperatureUnits } from '../../../Services/constants';
import { convertWindUnits } from '../../../Services/constants';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('WEATHERDATA', this.updateData);
    AppState.watch('CURRENTUNIT', this.updateData);
  }

  updateData(substate) {
    this.updateState(substate);
  }

  init() {
    const currentUnit = localStorage.getItem('currentUnit')
      ? localStorage.getItem('currentUnit')
      : 'C';
    this.state = {
      currentUnit: currentUnit
    };
    this.updateData = this.updateData.bind(this);
  }

  render() {
    const { weatherData } = this.state;

    return this.state.hasOwnProperty('weatherData')
      ? [
          {
            tag: 'div',
            classList: ['forecast-current'],
            children: [
              {
                tag: 'div',
                classList: ['city-name'],
                content: checkProperty(weatherData.name)
              },
              {
                tag: 'div',
                classList: ['forecast-details'],
                children: [
                  {
                    tag: 'div',
                    classList: ['forecast-item'],
                    children: [
                      {
                        tag: 'div',
                        classList: [
                          'forecast-item-text',
                          'forecast-item-text-day'
                        ],
                        content: getDayFromDateString(weatherData.dt)
                      },
                      {
                        tag: 'div',
                        classList: [
                          'forecast-item-text',
                          'forecast-item-text-icon',
                          'forecast-item-text-icon-date'
                        ],
                        content: getcurrentDateString(weatherData.dt)
                      },
                      {
                        tag: 'div',
                        classList: [
                          'forecast-item-text',
                          'forecast-item-text-icon',
                          'forecast-item-text-icon-pressure'
                        ],
                        content: `${convertPressure(
                          weatherData.main.pressure
                        )} mm Hg`
                      },
                      {
                        tag: 'div',
                        classList: [
                          'forecast-item-text',
                          'forecast-item-text-icon',
                          'forecast-item-text-icon-wind'
                        ],
                        content: `${convertWindUnits(
                          weatherData.wind.speed,
                          this.state.currentUnit
                        )}, ${defineWindDirection(weatherData.wind.deg)}`,

                        children: [
                          {
                            tag: 'span',
                            classList: ['humidity-icon']
                          }
                        ]
                      },
                      {
                        tag: 'div',
                        classList: [
                          'forecast-item-text',
                          'forecast-item-text-icon',
                          'forecast-item-text-icon-humidity'
                        ],
                        content: `${checkProperty(
                          weatherData.main.humidity
                        )} %`,
                        children: [
                          {
                            tag: 'span',
                            classList: ['humidity-icon']
                          }
                        ]
                      }
                    ]
                  },
                  {
                    tag: 'div',
                    classList: ['forecast-item'],
                    children: [
                      {
                        tag: 'div',
                        classList: [
                          'weather-icon-current',
                          `${generateIconClass(weatherData.weather[0].icon)}`
                        ]
                      },
                      {
                        tag: 'div',
                        classList: ['weather-icon-description'],
                        content: `${checkProperty(
                          weatherData.weather[0].description
                        )}`
                      }
                    ]
                  },
                  {
                    tag: 'div',
                    classList: ['forecast-item'],
                    children: [
                      {
                        tag: 'div',
                        classList: ['forecast-item-temps'],
                        children: [
                          {
                            tag: 'div',
                            classList: ['temp-min'],
                            content: convertTemperatureUnits(
                              weatherData.main.temp_min,
                              this.state.currentUnit
                            )
                          },
                          {
                            tag: 'div',
                            classList: ['temp-max'],
                            content: convertTemperatureUnits(
                              weatherData.main.temp_max,
                              this.state.currentUnit
                            )
                          }
                        ]
                      },
                      {
                        tag: 'div',
                        classList: ['forecast-item-tempcurrent'],
                        content: convertTemperatureUnits(
                          weatherData.main.temp,
                          this.state.currentUnit
                        )
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      : '';
  }
}
