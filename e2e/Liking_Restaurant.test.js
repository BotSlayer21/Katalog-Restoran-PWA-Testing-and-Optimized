/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.seeElement('#content');
  I.see('There is no restaurant to be shown', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('There is no restaurant to be shown', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.seeElement('.info_judul');
  const firstResto = locate('.info_judul').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.contentlist');
  const likedRestoTitle = await I.grabTextFrom('.info_judul');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('removing one favorite restaurant', async ({ I }) => {
  I.see('There is no restaurant to be shown', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.seeElement('.info_judul');
  const firstResto = await I.grabTextFrom('.info_judul');
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.contentlist');
  const likedRestoTitle = await I.grabTextFrom('.info_judul');
  assert.strictEqual(firstResto, likedRestoTitle);

  I.amOnPage('/#/favorite');
  I.seeElement('.info_judul');
  const firstFavRestoName = await I.grabTextFrom('.info_judul');

  I.click(firstFavRestoName);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see('There is no restaurant to be shown', '.restaurant-item__not__found');
});
