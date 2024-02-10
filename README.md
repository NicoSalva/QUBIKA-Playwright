### 🤖 QUBIKA PLAYWRIGHT SOLUTION 🤖

Prerequisites
Before starting, make sure you have Node.js installed on your system. This project has been developed and tested with Node.js version 8.19.4.

# 💡Installation

To install and set up the project in your local environment, follow these steps:

Run the install command and select the following to get started:

```
npm init playwright@latest
```

Choose JavaScript
Name of your Tests folder
Add a GitHub Actions workflow to easily run tests on CI
Install Playwright browsers (default is true)

Clone the Repository

```
Clone this repository to your local machine using:
git clone URL_OF_THE_REPOSITORY
cd NAME_OF_THE_DIRECTORY_REPOSITORY
```

Run the following command to install all the necessary dependencies for the project:

```
npm install
```

This will install Playwright along with any other dependency defined in your package.json file.

Running Tests

To run the automated tests with Playwright, use the following command:

npx playwright test

This command will execute all the tests defined in your project according to Playwright's default configuration.

Viewing Reports

After running the tests, you can open the test reports with the following command:

npx playwright show-report

### QUBIKA PLAYWRIGHT SOLUTION

### Introduction

Although the project is small and we could set up the test suite with all the elements to be consumed within its own development, I have tried to apply a structure so that the project is scalable. This way, if we need to add more tests or more parts of the page to test, it will be practical and, above all, maintainable. Best practices not only prevent us from being redundant but also allow us to have much more maintainable and scalable code.

I separated between the API service and FRONT parts, so then, I left my Pages and Locators separated clearly based on a reduced version of a POM architecture within FRONT. Within front, it did not seem necessary to separate locators into different files, but as I progressed with the development of the categoriesPage, the elements became abundant, so I decided to separate them as well. The idea of this architecture is rather to demonstrate the potential of how I would organize in case of having a larger project. It is also always valid to remember that the project's needs dictate the organization, so we will not always organize a project in the same way. Isolating locators from our page files generates better maintenance for future changes to them and also for changing or adding any necessary method in the future within the pages without having to review who interacts with whom.

On the API side, I left apiContext with all the basic information of the domain and on the other hand, a specific one for the management of clients, apiClient. Within the mentioned apiClient would go all the services that I need to define for the management of said service (login, registration, deletion, etc.). It is prudent not to perform validations of status or any kind so the tests are isolated from the definition of the service. I added a schema validation as this seems to be a good practice. When reviewing the swagger, I noticed that the definition of firstName, lastName, and fullName in the example of said swagger declares them as strings, and this caused problems for validating them since no matter how you send them, they always return null. I believe this is due to a lack of updating that document, and I decided to delete the part of the schema where it was validated that they were strings.

This architecture also provides us with the ability to keep adding different API files for each service that we are going to cover in the future. Inside spec would go the files of the flows that I want to automate, which in this case I have only one, and I also put it at the same level as API and front because in this type of E2E test I consume both API tests and UI tests. In the automated flow file 'userAndCategoryWorkflow.spec', there is only one test since the exercise clearly mentioned that everything should be in the same one. A possible improvement to apply, which I did and then deleted, would be to add a section of commonVariables for data management. I also moved the helpers folder, which I initially started in /api since it generated the client for registration via API, one hierarchy back because it was also consumed in front methods and, although it doesn't change much, respecting these types of hierarchies serves as an explanatory way of how to navigate or explore the repository.

The exercise mentions using the same user created from the API, and this would be a great solution in case of having to handle data neatly and pass it between different tests. As everything was contained in the declaration of the same test, it was unnecessary to do so, but in case of having more information management between different steps or tests, it is a controlled solution. I tried to ensure that the pages only take care of the methods that referred to their page, and that any type of validation happens within the test file since this allows for better reading of the project and defends the sense of single responsibility.
