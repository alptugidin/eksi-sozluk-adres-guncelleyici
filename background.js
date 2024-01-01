let val = null;

chrome.storage.sync.get(['value'], (result) => {
    val = result.value;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { alpt, newValue }] of Object.entries(changes)) {
        if (key === 'value') {
            val = newValue;
        }
    }
});

const errorListener = async (details) => {
    if (details.url.includes('eksisozluk')) {
        const baseStr = `//eksisozluk${val}.com/`
        const newUrl = details.url.replace(/\/\/(.*?)\//, baseStr);
        await chrome.tabs.update(details.tabId, {url: newUrl});
        if (details.url === newUrl) {
            chrome.webNavigation.onErrorOccurred.removeListener(errorListener);
        }
    }
};

chrome.webNavigation.onErrorOccurred.addListener(errorListener, {urls: ["https://*/*"]});
