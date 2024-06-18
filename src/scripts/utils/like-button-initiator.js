/* eslint-disable no-empty-function */
import FavoriteRestoranIdb from '../data/favorite-restoran-idb';
import { createlikeButtonTemplate, createlikedButtonTemplate } from '../views/templates/template-creator';

const likeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestoExist(id)) {
      this._renderliked();
    } else {
      this._renderlike();
    }
  },

  async _isRestoExist(id) {
    const restaurant = await FavoriteRestoranIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderlike() {
    this._likeButtonContainer.innerHTML = createlikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoranIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderliked() {
    this._likeButtonContainer.innerHTML = createlikedButtonTemplate();
    const likedButton = document.querySelector('#likeButton');
    likedButton.addEventListener('click', async () => {
      await FavoriteRestoranIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default likeButtonInitiator;
