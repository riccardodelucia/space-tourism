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

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});
