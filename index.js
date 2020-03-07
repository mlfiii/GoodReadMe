//declare the constants
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

//Used to gather user input.
function getUserInput() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "repo",
            message: "What is your project's name?"
        },
        {
            type: "input",
            name: "license",
            message: "What kind of license should your project have?"
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description of your project:"
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
            type: "input",
            name: "tests",
            message: "What command should be run to run tests?"
        },

        {
            type: "input",
            name: "contributing",
            message: "What does the user need to know about contributing to the repo?"
        }

    ]);
}

//Used to gather data from github.
getUserData = async (answers) => {
    try {
        const { data } = await axios.get(`https://api.github.com/search/repositories?q=repo:${answers.username}/${answers.repo}`);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

//Used to generate the html for markdown file.
function generateHTML(answers, github) {


    return `# *${answers.repo}* 
    

![GitHub license](https://img.shields.io/badge/license-mit-blue.svg)

## *Description*

${answers.description}

## *Table of Contents*

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
   
## *Intallation*

${ answers.installation}
      
## *Usage*    
${answers.usage}
    
## *License*
This project is licensed under the ${answers.license} license.
    
## *Contributing*
${answers.contributing}
    
## *Tests*
${answers.tests}

## *Questions*
<img src="${github.items[0].owner.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
If you have any questions about the repo, open an issue or contact <a src="${github.items[0].owner.url}">${github.items[0].owner.login}</a>.`;
}

//Used to run the overall code.
async function init() {

    try {
        const answers = await getUserInput();

        const github = await getUserData(answers)

        const mdfile = await generateHTML(answers, github);

        await writeFileAsync("readme.md", mdfile);

        console.log("Successfully wrote to readme.md");
    } catch (err) {
        console.log(err);
    }
}

//Used too start he code.
init();


