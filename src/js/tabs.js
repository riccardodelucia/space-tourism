function hideAllContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => item.classList.add("hidden"));
}

function showContent(parent, content) {
  parent.querySelector(content).classList.remove("hidden");
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  hideAllContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideAllContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImage}`]);
}

let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);
  }

  if (e.keyCode === keydownRight) {
    tabFocus++;
    if (tabFocus >= tabs.length) {
      tabFocus = 0;
    }
  }

  if (e.keyCode === keydownLeft) {
    tabFocus--;
    if (tabFocus < 0) {
      tabFocus = tabs.length - 1;
    }
  }

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

tabList.addEventListener("keydown", changeTabFocus);
