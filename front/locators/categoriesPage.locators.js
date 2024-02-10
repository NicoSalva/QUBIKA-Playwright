const locators = {
  categoriesPage: {
    newCategoryButton: 'text=Adicionar',
    categoryNameInput: '#input-username',
    createCategoryButton: '[type="submit"]',
    categoriesTable: 'tbody',
    nextButton: "li:last-child > a.page-link > span",
    dropdownContainer: "div.ng-select-container",
    pageList: 'div.card-footer > nav > ul > li',
    lastPage: 'li.page-item.disabled:has-text("Next")',
    optionToSelect: "div.ng-option",
    checkBox: 'div>label:nth-child(2)',
  }
};

module.exports = locators;
