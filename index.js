const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function getUserInput() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Project Title?"
        },
        {
            type: "input",
            name: "pdesc",
            message: "Project Description?"
        },
        {
            type: "input",
            name: "toc",
            message: "Table of Contents?"
        },
        {
            type: "input",
            name: "instl",
            message: "Installation?"
        },
        {
            type: "input",
            name: "usage",
            message: "Usage?"
        },
        {
            type: "input",
            name: "lic",
            message: "License?"
        },
        {
            type: "input",
            name: "contrib",
            message: "Contributing?"
        },
        {
            type: "input",
            name: "tests",
            message: "Tests?"
        },
        {
            type: "input",
            name: "quest",
            message: "Questions?"
        }
    ]);
}

function generateHTML(answers) {
    return `# *${answers.title}* 

## *${answers.pdesc}*

## *Table of Contents*
${answers.toc}
   
## *Intallatioon*
${answers.instl}
    
## *Usage*    
${answers.usage}
    
## *License*
${answers.lic}
    
## *Contributors*
${answers.contrib}
    
## *Tests*
${answers.tests}

## *Questions*
${answers.quest}`;
}


async function init() {
    console.log("hi")
    try {
        const answers = await getUserInput();

        const mdfile = generateHTML(answers);

        await writeFileAsync("readme.md", mdfile);

        console.log("Successfully wrote to index.html");
    } catch (err) {
        console.log(err);
    }
}

init();