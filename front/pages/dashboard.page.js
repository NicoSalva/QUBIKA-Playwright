class DashboardPage {
    constructor(page) {
        this.page = page;
    }

    async verifyIsOnDashboard() {
        await this.page.waitForURL('**/#/dashboard');
    }
}

module.exports = { DashboardPage };