let lang = 'en';

let keyCodeList = [];

const keyCodeListRu = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift',
  'Control', 'Meta', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
];
const keyCodeListEn = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', ',', '/', 'ArrowUp', 'Shift',
  'Control', 'Meta', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
];

const specialKeyNameList = {
  'Control': 'Ctrl',
  'Delete': 'Del',
  'CapsLock': 'Caps Lock',
  ' ': 'Space',
  'Meta': 'Win',
  'ArrowRight': '→',
  'ArrowLeft': '←',
  'ArrowDown': '↓',
  'ArrowUp': '↑',
};

function setLang(langCode = 'en') {
  if (langCode === 'ru') {
    lang = 'ru';
    keyCodeList = keyCodeListRu;
  } else {
    lang = 'en';
    keyCodeList = keyCodeListEn;
  }
}

function createBodyContainer() {
  let createBody = document.createElement('main');
  createBody.id = 'body-container';
  return createBody;
}

function createKeyboardInput() {
  let createInput = document.createElement('input');
  createInput.id = 'keyboard-input';
  return createInput;
}

function createKeys() {
  setLang(lang);

  let keysContainer = document.createElement('div');
  keysContainer.id = 'keys-container';

  for (let i = 0; i < keyCodeList.length; i++) {
    let keyName = specialKeyNameList[keyCodeList[i]]? specialKeyNameList[keyCodeList[i]] : keyCodeList[i];
    let key = document.createElement('div');
    key.classList.add('key');
    if (keyCodeList[i] === ' '){
      key.classList.add('space');
    }
    key.id = keyCodeList[i];
    key.innerText = keyName;
    keysContainer.appendChild(key);
  }

  return keysContainer;
}

function replaceKeys() {
  document.getElementById('keys-container').remove();
  document.getElementById('body-container').appendChild(createKeys());
  initVirtualKeyPressHandler();
}

function addKeyToInput(key) {
  let input = document.getElementById('keyboard-input');
  if (key === 'Backspace') {
    let inputArrayValue = input.value.split('')
    inputArrayValue.pop();
    input.value = inputArrayValue.join('');
  }
  else if (key.length === 1) {
    input.value = input.value + key;
  }
}

function initKeyPressHandler() {
  document.addEventListener('keydown', function(event) {
    if (keyCodeList.includes(event.key)) {
      addKeyToInput(event.key);
      let keyId = specialKeyNameList[event.key]? specialKeyNameList[event.key] : event.key;
      let keyHtml = document.getElementById(keyId);
      if (keyHtml) {
        keyHtml.classList.add('active');
      }
    }
  });
  document.addEventListener('keyup', function(event) {
    if (keyCodeList.includes(event.key)) {
      let keyId = specialKeyNameList[event.key]? specialKeyNameList[event.key] : event.key;
      let keyHtml = document.getElementById(keyId);
      if (keyHtml) {
        keyHtml.classList.remove('active');
      }
    }
  });
}

function initVirtualKeyPressHandler() {
  document.querySelectorAll('.key').forEach(function(key) {
    key.addEventListener('click', function(){
      addKeyToInput(key.id);
      key.classList.add('active');
      setTimeout(function(){
        key.classList.remove('active');
      }, 200);
    })
  })
}

function initChangeLanguageHandler() {
  let shiftFlag = false;
  let altFLag = false;

  document.onkeydown = function(event) {
    if (event.key === 'Alt') {
      altFLag = true;
    }
    else if (event.key === 'Shift') {
      shiftFlag = true;
    }
  };

  document.onkeyup = function(event) {
    if (event.key === 'Alt') {
      if (shiftFlag) {
        setLang(lang === 'en' ? 'ru' : 'en');
        replaceKeys();
      }
      shiftFlag = altFLag = false;
    }

    else if (event.key === 'Shift') {
      if (altFLag) {
        setLang(lang === 'en' ? 'ru' : 'en');
        replaceKeys();
      }
      shiftFlag = altFLag = false;
    }
  };
}

document.addEventListener('DOMContentLoaded', function() {
  let bodyContainer = createBodyContainer();
  bodyContainer.appendChild(createKeyboardInput());
  bodyContainer.appendChild(createKeys());
  document.body.appendChild(bodyContainer);

  initChangeLanguageHandler();
  initKeyPressHandler();
  initVirtualKeyPressHandler();
});