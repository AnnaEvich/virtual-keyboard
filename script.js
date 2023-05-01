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

// let keyCodeList = [];
let keyCodeList = keyCodeListEn;


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

document.addEventListener('DOMContentLoaded', function() {
  let bodyContainer = createBodyContainer();
  bodyContainer.appendChild(createKeyboardInput());
  bodyContainer.appendChild(createKeys());
  document.body.appendChild(bodyContainer);
});