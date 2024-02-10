const { faker } = require('@faker-js/faker');

/**
 * Generates an object with random user data using Faker.js.
 * The data includes a uniquely generated email, first name, full name, unique identifier,
 * password, roles (fixed to 'ROLE_ADMIN'), and username.
 */
const generateUserData = () => {
  return {
    email: `test-${faker.string.uuid()}@example.com`,
    firstName: faker.person.firstName(),
    fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
    id: faker.string.uuid(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(),
    roles: ['ROLE_ADMIN'],
    userName: faker.internet.userName()
  };
};

/**
 * Generates an object with random names for a category and subcategory
 * using Faker.js. Each name is prefixed with "Category-" or "Subcategory-"
 * to differentiate them.
 */
const generateCategoryData = () => {
  return {
    categoryName: `Category-${faker.commerce.department()}`, // Ya existente
    subCategoryName: `Subcategory-${faker.commerce.productName()}` // Añadido
  };
};

module.exports = { generateUserData, generateCategoryData };

