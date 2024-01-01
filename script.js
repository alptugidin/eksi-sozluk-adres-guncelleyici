const input = document.querySelector('#num-input');
const okButton = document.querySelector('#ok');

const getData = async () => {
    const data = await chrome.storage.sync.get(['value']);
    input.value = data.value ?? '';
};

const setData = async () => {
    await chrome.storage.sync.set({value: input.value});
};

okButton.addEventListener('click', setData);

window.onload = async () => getData();
