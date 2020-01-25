'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var CHARACTERS_COUNT = 4;

var charactersList = document.querySelector('.setup-similar-list');
var characterCustomisation = document.querySelector('.setup');
var characterTemplate = document.querySelector('#similar-wizard-template')
  .content.children[0];
var chars = document.querySelector('.setup-similar');

var generateRandomIndex = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var generateCharacterData = function () {
  return {
    name:
      NAMES[generateRandomIndex(0, 7)] +
      ' ' +
      SURNAMES[generateRandomIndex(0, 7)],
    coatColor: COAT_COLORS[generateRandomIndex(0, 5)],
    eyesColor: EYES_COLORS[generateRandomIndex(0, 5)]
  };
};

var fillPoolWithCharacters = function (charactersCount) {
  var characters = [];
  for (var i = 0; i < charactersCount; i++) {
    characters.push(generateCharacterData());
  }

  return characters;
};

var generateCharacterNode = function (characterData) {
  var characterNode = characterTemplate.cloneNode(true);
  var wizardName = characterNode.querySelector('.setup-similar-label');
  wizardName.textContent = characterData.name;
  var wizardCoatColor = characterNode.querySelector('.wizard-coat');
  wizardCoatColor.style.fill = characterData.coatColor;
  var wizardEyesColor = characterNode.querySelector('.wizard-eyes');
  wizardEyesColor.style.fill = characterData.eyesColor;

  return characterNode;
};

var generateCharacterList = function (characterListNode, characterData) {
  for (var i = 0; i < characterData.length; i++) {
    characterListNode.appendChild(generateCharacterNode(characterData[i]));
  }
};

var charactersPool = fillPoolWithCharacters(CHARACTERS_COUNT);

generateCharacterList(charactersList, charactersPool);

characterCustomisation.classList.remove('hidden');
chars.classList.remove('hidden');
