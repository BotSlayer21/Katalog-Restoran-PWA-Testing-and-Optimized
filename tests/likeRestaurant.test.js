/* eslint-disable no-undef */
import FavoriteRestoranIdb from '../src/scripts/data/favorite-restoran-idb';
import * as TestFactories from './helpers/testfactories';

describe('Liking A Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant hasn`t been liked before', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="like this resto"]')).toBeTruthy();
  });

  it('shouldn`t show the unlike button when the restaurant hasn`t been liked before', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this resto]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestoranIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
    await FavoriteRestoranIdb.deleteRestaurant(1);
  });

  it('shouldn`t add a restaurant again when its already liked', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({ id: 1 });
    await FavoriteRestoranIdb.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestoranIdb.getAllRestaurant()).toEqual([{ id: 1 }]);
    await FavoriteRestoranIdb.deleteRestaurant(1);
  });

  it('shouldn`t add a restaurant when it has no id', async () => {
    await TestFactories.makeLikeButtonPresentWithResto({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestoranIdb.getAllRestaurant()).toEqual([]);
  });
});
