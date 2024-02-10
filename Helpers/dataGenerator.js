const { faker } = require('@faker-js/faker');

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

const generateCategoryData = () => {
  return {
    categoryName: `Category-${faker.commerce.department()}`, // Ya existente
    subCategoryName: `Subcategory-${faker.commerce.productName()}` // Añadido
  };
};

module.exports = { generateUserData, generateCategoryData };

