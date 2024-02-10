const locators = require('../locators/homePage.locators');

class HomePage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://club-administration.qa.qubika.com/#/auth/login');
    }

    getEmailInput() {
        return this.page.locator(locators.homePage.emailInput);
    }

    getPasswordInput() {
        return this.page.locator(locators.homePage.passwordInput);
    }

    getSubmitButton() {
        return this.page.locator(locators.homePage.submitButton);
    }

    async performLogin(user) {
        await this.getEmailInput().fill(user.email);
        await this.getPasswordInput().fill(user.password);
        await this.getSubmitButton().click();
    }
}

module.exports = { HomePage };