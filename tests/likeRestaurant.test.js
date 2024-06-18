/* eslint-disable no-undef */
import likeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestoranIdb from '../src/scripts/data/favorite-restoran-idb';

describe('Liking A Resto', async () => {
  it('should show the like button when the restaurant has not been liked before', async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="like this resto"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="unlike this resto]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await likeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
  });
  document.querySelector('#likeButton').dispatchEvent(new Event('click'));
  // Memastikan Resto berhasil disukai
  const restaurant = await FavoriteRestoranIdb.getRestaurant(1);
  expect(restaurant).toEqual({ id: 1 });

  await FavoriteRestoranIdb.deleteRestaurant(1);
});
