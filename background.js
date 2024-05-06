let tabData = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ tabData: {} });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;
  const timestamp = Date.now();
  
  chrome.storage.local.get('tabData', (data) => {
    tabData = data.tabData || {};
    tabData[tabId] = timestamp;
    chrome.storage.local.set({ tabData });
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.get('tabData', (data) => {
    tabData = data.tabData || {};
    if (tabData[tabId]) {
      const timeSpent = (Date.now() - tabData[tabId]) / (1000 * 60); // Convert milliseconds to minutes
      console.log(`Tab ${tabId} spent ${timeSpent.toFixed(2)} minutes`);
      delete tabData[tabId];
      chrome.storage.local.set({ tabData });
    }
  });
});
