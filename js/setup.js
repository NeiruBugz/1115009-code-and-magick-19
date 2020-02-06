'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var CHARACTERS_COUNT = 4;

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var charactersList = document.querySelector('.setup-similar-list');
var characterCustomisation = document.querySelector('.setup');
var characterTemplate = document.querySelector('#similar-wizard-template')
  .content.children[0];
var chars = document.querySelector('.setup-similar');
var openSetupDialogButton = document.querySelector('.setup-open');
var closeSetupDialogButton = characterCustomisation.querySelector('.setup-close');

var characterNameInput = characterCustomisation.querySelector('.setup-user-name');
var wizardCoat = characterCustomisation.querySelector('.wizard-coat');
var wizardCoatInput = characterCustomisation.querySelector('input[name="coat-color"]');
var wizardEyes = characterCustomisation.querySelector('.wizard-eyes');
var wizardEyesInput = characterCustomisation.querySelector('input[name="eyes-color"]');
var fireballColor = characterCustomisation.querySelector('.setup-fireball-wrap');
var fireballColorInput = characterCustomisation.querySelector('input[name="fireball-color"]');

var onEscDialog = function (evt) {
  if (evt.key === ESC_KEY) {
    closeDialog();
  }
};

var openDialog = function () {
  characterCustomisation.classList.remove('hidden');
  document.addEventListener('keydown', onEscDialog);
};

var closeDialog = function () {
  characterCustomisation.classList.add('hidden');
  document.addEventListener('keydown', onEscDialog);
};

openSetupDialogButton.addEventListener('click', function () {
  openDialog();
});

openSetupDialogButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openDialog();
  }
});

closeSetupDialogButton.addEventListener('click', function () {
  closeDialog();
});

closeSetupDialogButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeDialog();
  }
});

wizardCoat.addEventListener('click', function (evt) {
  evt.preventDefault();
  var color = COAT_COLORS[generateRandomIndex(0, COAT_COLORS.length)];
  wizardCoat.style.fill = color;
  wizardCoatInput.value = color;
});

wizardEyes.addEventListener('click', function (evt) {
  evt.preventDefault();
  var color = EYES_COLORS[generateRandomIndex(0, EYES_COLORS.length)];
  wizardEyes.style.fill = color;
  wizardEyesInput.value = color;
});

fireballColor.addEventListener('click', function (evt) {
  evt.preventDefault();
  var color = FIREBALL_COLORS[generateRandomIndex(0, FIREBALL_COLORS.length)];
  fireballColor.style.backgroundColor = color;
  fireballColorInput.value = color;
});

characterNameInput.addEventListener('invalid', function () {
  if (characterNameInput.validity.tooShort) {
    characterNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (characterNameInput.validity.tooLong) {
    characterNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (characterNameInput.validity.valueMissing) {
    characterNameInput.setCustomValidity('Обязательное поле');
  } else {
    characterNameInput.setCustomValidity('');
  }
});

characterNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else if (target.value.leading > MAX_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять максимум из ' + MAX_NAME_LENGTH + '-х символов');
  } else {
    target.setCustomValidity('');
  }
});

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
    eyesColor: EYES_COLORS[generateRandomIndex(0, 5)],
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

chars.classList.remove('hidden');
