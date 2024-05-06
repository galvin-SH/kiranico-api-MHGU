# kiranico-api-MHGU

![MIT License](https://img.shields.io/badge/License-MIT%20License-blue)

## Description

Web scraping tool that acts as a functional api for https://mhgu.kiranico.com/

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [License](#license)
-   [How to Contribute](#contributing)
-   [Tests](#tests)
-   [Questions](#questions)

## Installation

Clone the repository and run `npm install` to install the required dependencies. The project can be run using `npm start` or `node server.js` and will be hosted on `localhost:3001`

## Usage

After starting the server, the api can be accessed by sending a GET request to `localhost:3001/api/` followed by the desired endpoint. The currently implemented endpoints are as follows:

-   /api/weapons - returns a list of all weapons (in the SNS catagory)
-   /api/weapons/GS - returns a list of all Great Swords along with their required upgrade materials

Weapon data is returned to the user in JSON format and can be used for a variety of purposes such as creating a database or displaying information on a website.

The framework for more endpoints and functionality is currently working, however at the moment the api satisfied my personal needs and is not currently being developed further but may be in the future.

## License

This project is licenced under [MIT License](https://choosealicense.com/licenses/mit)

## Contributing

This project is not currently seeking any collaborators

## Tests

This project does not currently implement any test functionality

## Questions

If you have any questions or concerns regarding this project, my github profile can be located by using the following link
https://github.com/galvin-sh
