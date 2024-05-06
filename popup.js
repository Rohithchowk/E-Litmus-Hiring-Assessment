document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('tabData', (data) => {
      const tabData = data.tabData || {};
      const tabDataElement = document.getElementById('tabData');
      tabDataElement.innerHTML = '';
      for (const tabId in tabData) {
        const timeSpent = Date.now() - tabData[tabId];
        const tabDiv = document.createElement('div');
        tabDiv.textContent = `Tab ${tabId} spent ${timeSpent} milliseconds`;
        tabDataElement.appendChild(tabDiv);
      }
    });
  });
  