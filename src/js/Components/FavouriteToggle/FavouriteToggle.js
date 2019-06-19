import Component from '../../framework/Component';
import AppState from '../../../Services/AppState';

export default class FavouriteToggle extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('ISFAVOURITEPLACE', this.updateMyself);
    AppState.watch('WEATHERDATA', this.updateMyself);
  }

  updateMyself(substate) {
    this.updateState(substate);
  }

  init() {
    this.updateMyself = this.updateMyself.bind(this);
    this.handleFavouritePlace = this.handleFavouritePlace.bind(this);
    this.state = {
      isFavourite: false
    };
  }

  handleFavouritePlace({ target }) {
    if (target.matches('.add-to-favourite')) {
      const { weatherData } = this.state;

      if (weatherData) {
        const formattedPlace = weatherData.formattedPlace || weatherData.name;
        const placeName = weatherData.place || weatherData.name;
        const placeId = weatherData.placeId;

        AppState.update('FAVOURITEPLACEDATA', {
          placeId: placeId,
          place: placeName,
          formattedPlace: formattedPlace
        });
      }
    }
  }

  render() {
    return [
      {
        tag: 'button',
        classList: [
          'add-to-favourite',
          this.state.isFavourite ? 'add-to-favourite-active' : 'button'
        ],
        eventHandlers: {
          click: this.handleFavouritePlace
        }
      }
    ];
  }
}
