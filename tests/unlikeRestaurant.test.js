/* eslint-disable no-undef */
import FavoriteRestoranIdb from '../src/scripts/data/favorite-restoran-idb';
import * as TestFactories from './helpers/testfactories';

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoranIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestoranIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the movie has been liked', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this resto"]')).toBeTruthy();
  });

  it('shouldn`t display like widget when the restaurant has been liked', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="like this movie"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestoranIdb.getAllRestaurant()).toEqual([]);
  });

  it('shouldn`t throw error when user click unlike widget if the unliked movie isn`t in the list', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    await FavoriteRestoranIdb.deleteRestaurant(1);
    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestoranIdb.getAllRestaurant()).toEqual([]);
  });
});
