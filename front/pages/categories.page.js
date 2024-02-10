const locators = require('../locators/categoriesPage.locators');

class CategoriesPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://club-administration.qa.qubika.com/#/category-type');
    }

    async createNewCategory(categoryName) {
        await this.page.click(locators.categoriesPage.newCategoryButton);
        await this.page.fill(locators.categoriesPage.categoryNameInput, categoryName);
        await this.page.click(locators.categoriesPage.createCategoryButton);
        await this.page.waitForLoadState('networkidle');
    }

    async createNewSubcategory(subcategoryName, parentCategoryName) {
        await this.page.click(locators.categoriesPage.newCategoryButton);
        await this.page.fill(locators.categoriesPage.categoryNameInput, subcategoryName);
        await this.page.click(locators.categoriesPage.checkBox);
        await this.page.click(locators.categoriesPage.dropdownContainer);
        await this.page.click(`${locators.categoriesPage.optionToSelect} >> text="${parentCategoryName}"`);
        await this.page.click(locators.categoriesPage.createCategoryButton);
        await this.page.waitForLoadState('networkidle');
    }

    async gotoLastPage() {
        const paginationSelector = locators.categoriesPage.pageList;
        const listItems = await this.page.$$(paginationSelector);
        const numberOfItems = listItems.length;
        const secondLastItem = listItems[numberOfItems - 2]; 
    
        await secondLastItem.click(); 
        await this.page.waitForSelector(locators.categoriesPage.lastPage, { state: 'attached' });
    }
    

    async findLastCategoryInTable() {
        const tableSelector = locators.categoriesPage.categoriesTable;
        const lastTrSelector = `${tableSelector} tr:last-child`;
        const firstTdInLastTrSelector = `${lastTrSelector} > td:first-child`;
        const text = await this.page.textContent(firstTdInLastTrSelector);

        return text;
    }

    async findParentCategoryInTable() {
        const tableSelector = locators.categoriesPage.categoriesTable;
        const lastTrSelector = `${tableSelector} tr:last-child`;
        const secondTdInLastTrSelector = `${lastTrSelector} > td:nth-child(2)`;
        const text = await this.page.textContent(secondTdInLastTrSelector);
    
        return text;
    }

    async reload(){
        await this.page.reload()
    }
}

module.exports = { CategoriesPage };