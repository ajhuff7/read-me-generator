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
      message: "What is the description of your project?"
    },
    {
      type: "input",
      name: "installation",
      message: "What is the installation process for your project?"
    },
    {
      type: "input",
      name: "usage",
      message: "What do users need to know to use this?"
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
      message: "List the contributors."
    },
    {
      type: "input",
      name: "tests",
      message: "What command should be used to run tests?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your github email?"
    },
    {
      type: "input",
      name: "username",
      message: "What is your github username?"
    }
  ]);
}

function createReadme(answers) {
  return `
#${answers.title}
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
Install ${answers.installation} on your terminal to access.

------
## Usage
<br>
${answers.usage}

------
## Tests
<br>
${answers.tests}

------
## Contributors
<br>
${answers.contributors}

------
## License
<br>

[![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-lightgrey.svg)](https://opensource.org/licenses/${answers.license})

-------
## Inquiries...
<br>
For inquiries please connect with me on GitHub at: ${answers.username} or contact me by email at: ${answers.email}

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