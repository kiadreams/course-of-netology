
class Tab {

  constructor(tabContainer) {
    this.tabs = tabContainer.querySelectorAll('.tab');
    this.tabContents = tabContainer.querySelectorAll('.tab__content');
    this.addListners();
  }

  addListners() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => { this.selectTab(index) });
    });
  }

  selectTab(tabNumber) {
    this.tabs.forEach(tab => tab.classList.remove('tab_active'));
    this.tabs[tabNumber].classList.add('tab_active');

    this.tabContents.forEach(content => {
      content.classList.remove('tab__content_active');
    });
    this.tabContents[tabNumber].classList.add('tab__content_active')
  }
}


document.querySelectorAll('.tabs').forEach(tabPanel => {
  new Tab(tabPanel);
});
