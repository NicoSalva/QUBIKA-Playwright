const { apiContext } = require('./apiContext'); 


async function createUser(userData) {
  const apiResponse = await (await apiContext).post('/api/auth/register', {
    data: userData,
  });
  
  return apiResponse;
}

module.exports = { createUser };
