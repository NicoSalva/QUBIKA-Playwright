const { test, expect } = require('@playwright/test');
const { generateUserData, generateCategoryData } = require('../Helpers/dataGenerator');
const { HomePage } = require('../front/pages/home.page');
const { DashboardPage } = require('../front/pages/dashboard.page');
const { CategoriesPage } = require('../front/pages/categories.page');
const Ajv = require('ajv');
const { userSchema } = require('../api/contracts/userResponse');
const { createUser } = require('../api/apiClient');
const ajv = new Ajv();

test.describe('User and Category Workflow', () => {
  test('automate user creation to category management', async ({ page }) => {

    //1: Create a new user through API
    const userData = generateUserData();
    const createdUserResponse = await createUser(userData);
    const responseBody = await createdUserResponse.json();


    // Ensure the API responds with the expected status code and correct data.
    expect(createdUserResponse.status()).toBe(201);
    expect(createdUserResponse)
    expect(responseBody.roles).toEqual(['ROLE_ADMIN']); // Ensure this matches the expected format, array in this case
    expect(responseBody.email).toEqual(userData.email);
    expect(responseBody).toHaveProperty('id');

    // Validate the response against the defined schema.
    const validate = ajv.compile(userSchema);
    const valid = validate(responseBody);
    if (!valid) {
      throw new Error(`Schema validation errors: ${ajv.errorsText(validate.errors)}`);
    }
    expect(valid).toBeTruthy();


    const homePage = new HomePage(page);
    const dashboardPage = new DashboardPage(page);
    const categoriesPage = new CategoriesPage(page)

    //2: Go to Qubika Sports Club
    await homePage.goto();

    //3: Validate that the login page is displayed correctly
    await expect(homePage.getEmailInput()).toBeVisible();
    await expect(homePage.getPasswordInput()).toBeVisible();
    await expect(homePage.getSubmitButton()).toBeVisible();

    //4: Log in with the created user
    await homePage.performLogin(userData);

    //5: Validate that the user is logged in
    await dashboardPage.verifyIsOnDashboard();
    await expect(page.url()).toContain('/#/dashboard');

    //6 a) Go to the Category page
    await categoriesPage.goto();

    //6 b) Create a new category and validate that the category was created successfully
    const { categoryName, subCategoryName } = generateCategoryData();


    await categoriesPage.createNewCategory(categoryName);
    
    await categoriesPage.gotoLastPage();
    const validateFirstCategory = await categoriesPage.findLastCategoryInTable();
    expect(validateFirstCategory).toBeTruthy();
    expect(categoryName).toEqual(validateFirstCategory);


    //6 c) Create a sub category and validate it is displayed in the Categories list
    await categoriesPage.reload();
    await categoriesPage.createNewSubcategory(subCategoryName, categoryName);
    
    await categoriesPage.gotoLastPage();
    const validateCategory = await categoriesPage.findLastCategoryInTable();
    expect(validateCategory).toBeTruthy();
    expect(subCategoryName).toEqual(validateCategory);

    //6 d) Validate the parent category
    await categoriesPage.gotoLastPage();
    const validateParentCategory = await categoriesPage.findParentCategoryInTable();
    expect(validateParentCategory).toBeTruthy();
    expect(categoryName).toEqual(validateParentCategory);
  });
});