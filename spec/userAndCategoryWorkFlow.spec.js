const { test, expect } = require('@playwright/test');
const { generateUserData, generateCategoryData } = require('../helpers/dataGenerator');
const { HomePage } = require('../front/pages/home.page');
const { DashboardPage } = require('../front/pages/dashboard.page');
const { CategoriesPage } = require('../front/pages/categories.page');
const Ajv = require('ajv');
const { userSchema } = require('../api/contracts/userResponse');
const { createUser } = require('../api/apiClient');
const ajv = new Ajv();

test.describe('User and Category Workflow', () => {
  let userData, categoryName, subCategoryName;

  test.beforeAll(async () => {
    //ramdon data generations
    userData = generateUserData();
    const categoryData = generateCategoryData();
    categoryName = categoryData.categoryName;
    subCategoryName = categoryData.subCategoryName;
  })

  test('automate user creation to category management', async ({ page }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const dashboardPage = new DashboardPage(page);
    const categoriesPage = new CategoriesPage(page);

    // Step 1: Create a new user through API
    const createdUserResponse = await createUser(userData);
    const responseBody = await createdUserResponse.json();

    // Ensure the API responds with the expected status code and correct data
    expect(createdUserResponse.status()).toBe(201);
    expect(responseBody.roles).toEqual(['ROLE_ADMIN']); // Ensures this matches the expected format
    expect(responseBody.email).toEqual(userData.email);
    expect(responseBody).toHaveProperty('id');

    // Validate the response against the defined schema
    const validate = ajv.compile(userSchema);
    const valid = validate(responseBody);
    if (!valid) {
      throw new Error(`Schema validation errors: ${ajv.errorsText(validate.errors)}`);
    }
    expect(valid).toBeTruthy();

    // Step 2: Navigate to the Qubika Sports Club homepage
    await homePage.goto();

    // Step 3: Validate the login page's visibility
    await expect(homePage.getEmailInput()).toBeVisible();
    await expect(homePage.getPasswordInput()).toBeVisible();
    await expect(homePage.getSubmitButton()).toBeVisible();

    // Step 4: Log in with the created user
    await homePage.performLogin(userData);

    // Step 5: Validate successful login by verifying the dashboard URL
    await dashboardPage.verifyIsOnDashboard();
    expect(page.url()).toContain('/#/dashboard');

    // Step 6a: Navigate to the Category page
    await categoriesPage.goto();

    // Step 6b: Create a new category and validate its successful creation
    await categoriesPage.createNewCategory(categoryName);
    await categoriesPage.gotoLastPage(); // Navigate to the last page to find the category
    const validateFirstCategory = await categoriesPage.findLastCategoryInTable();
    expect(validateFirstCategory).toBeTruthy();
    expect(categoryName).toEqual(validateFirstCategory);

    // Step 6c: Create a subcategory and validate its presence in the Categories list
    await categoriesPage.reload(); // Reload the Categories Page
    await categoriesPage.createNewSubcategory(subCategoryName, categoryName);
    await categoriesPage.gotoLastPage(); // Navigate to the last page to validate the subcategory
    const validateCategory = await categoriesPage.findLastCategoryInTable();
    expect(validateCategory).toBeTruthy();
    expect(subCategoryName).toEqual(validateCategory);

    // Step 6d: Validate the parent category's presence (Assuming it's necessary)
    await categoriesPage.gotoLastPage();
    const validateParentCategory = await categoriesPage.findParentCategoryInTable();
    expect(validateParentCategory).toBeTruthy();
    expect(categoryName).toEqual(validateParentCategory);
  });
});
