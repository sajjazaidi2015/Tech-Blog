# Tech-Blog
https://salty-depths-52610.herokuapp.com/

## Description

This Tech Blog is a CMS style project utilising the MVC structure, routes, SQL and Handlebars templating. In this website, users can view/edit posts, leave comments login and register. Bootstrap is used as the primary CSS styling.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)


## Installation

To install the files into your local repo, using Git Bash Terminal:

1) Create a folder locally to nominate for cloning from online repo
2) Clone with SSH by

```GitBash Commands
git clone git@github.com:leonhsu95/tech-blog.git"
 ```

Additionally, please install [NodeJS](https://nodejs.org/en/) and the below npm packages

```Terminal Commands
npm i init -y
npm i
npm i bcrypt
npm i connect-session-sequelize
npm i dotenv
npm i express
npm i express-handlebars
npm i express-session
npm i handlebars
npm i inquirer
npm i mysql2
npm i nodemon
npm i sequelize
 ```

 Before you run the code, please change scripts:{start: } to 'node server.js' in the package.json file and change your database login credentials in the .env file.

 It is highly encouraged to install [Insomnia](https://insomnia.rest/), [MySQL](https://www.mysql.com/products/community/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) for RESTful API and Database functionalities to work.
