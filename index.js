const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Choices = require("inquirer/lib/objects/choices");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Write a description of your project."
    },
    {
      type: "input",
      name: "installation",
      message: "What command should be run to install dependencies?"
    },
    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?"
    },
    {
      type: "list",
      name: "license",
      message: "Choose your license name.",
      choices: ["MIT", "ISC", "Zlib"]
    },
    {
      type: "input",
      name: "contributors",
      message: "What does the user need to know about contributing to the repo?"
    },
    {
      type: "input",
      name: "tests",
      message: "What command should be used to run tests?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    }
  ]);
}

function createReadme(answers) {
  return `
# ${answers.title}
=========

${answers.description}
<br>

------
## Table of Contents
<br>

* [Installation](#installation)

* [Usage](#usage)

* [Tests](#tests)

* [Contributors](#contributing)

* [License](#license)

* [Inquiries](#inquiries)

------
## Installation
<br>
To install dependencies, run the following command: 
${answers.installation}

------
## Usage
<br>
${answers.usage}

------
## Tests
<br>
To run tests, run the following command:
${answers.tests}

------
## Contributors
<br>
${answers.contributors}

------
## License
<br>
This project is licensed under:
[![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-lightgrey.svg)](https://opensource.org/licenses/${answers.license})

-------
## Inquiries...
<br>
For inquiries about the repo, please contact me at: ${answers.email}. You can find more of my work at: ${answers.username}.

![picture](https://github.com/${answers.username}.png?size=80)

`;
}


async function init() {
    try {
        const answers = await promptUser();
        const readMe = createReadme(answers);
        await writeFileAsync("README.md", readMe);
        console.log("Works");
    }

  catch (err) {
    console.log(err);
  };
}

init()