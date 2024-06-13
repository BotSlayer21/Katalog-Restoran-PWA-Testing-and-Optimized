/* eslint-disable no-empty-function */
import FavoriteRestoranIdb from '../data/favorite-restoran-idb';
import { createsukaButtonTemplate, createsukadButtonTemplate } from '../views/templates/template-creator';

const sukaButtonInitiator = {
  async init({ sukaButtonContainer, restaurant }) {
    this._sukaButtonContainer = sukaButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestoExist(id)) {
      this._rendersukad();
    } else {
      this._rendersuka();
    }
  },

  async _isRestoExist(id) {
    const restaurant = await FavoriteRestoranIdb.getRestaurant(id);
    return !!restaurant;
  },

  _rendersuka() {
    this._sukaButtonContainer.innerHTML = createsukaButtonTemplate();

    const sukaButton = document.querySelector('#sukaButton');
    sukaButton.addEventListener('click', async () => {
      await FavoriteRestoranIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _rendersukad() {
    this._sukaButtonContainer.innerHTML = createsukadButtonTemplate();
    const sukadButton = document.querySelector('#sukaButton');
    sukadButton.addEventListener('click', async () => {
      await FavoriteRestoranIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default sukaButtonInitiator;
