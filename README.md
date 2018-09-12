# Optie Coding Challenge 2018
----
## Overview:
For this coding challenge we are asking you to write a program that parses a JSON object containing 1000 n-grams and sorts them into different categories. The categories should be based on the definition of the words, however, the manner that they are sorted is completely up to you. This means it is up to you to figure out how to find similarities between words and group them together.

In this zip file you will find the skeleton of a single page site with blank HTML and CSS files, with the JSON object saved as *ngrams* within the JS file

---
## Setup:
1. Make sure your both the most recent versions of node and npm are installed on your computer
2. Unzip the project or fork the project
3. In your command line follow these steps:

```sh
$ cd optie-coding-challenge
$ npm install
$ npm start
```

This should start up the project and if you go to [http://localhost:8080](http://localhost:8080) you will see the rendered HTML file

----
## Requirements and Specs:
* You may alter index.html, scripts.js and style.css
* Do not change the JSON object provided in scripts.js
* Parse the JSON object  in the manner you choose, and display it on the HTML page
* HTML and CSS does not need to be amazing, as long as your output is clearly visible and makes sense
* NPM is already set up in the project, but you can use any other API, framework or platform you find useful as well
* Everything must be written in Javascript, HTML or CSS
* Comment lines/blocks of code that are not obvious to their purpose

Note: You may ask me up to three questions during the week. The questions can be about anything relating to this challenge. However, I will not give you a direct solution if it is too broad or unspecific. My email: gina@optieapp.com

----
## What to Turn In:
1. The zip file with the HTML, CSS and JS files 
2. Please **do not** include the node-modules folder
2. Update this README to **briefly** explain how you came to your solution and the libraries, frameworks and steps you took to complete the challenge
3. Please name the zip file your entire name

----
## Hints:
1. Look into the [natural](https://www.npmjs.com/package/natural) or [wordpos](https://www.npmjs.com/package/wordpos) libraries
2. Focus on grouping words/phrases together
3. Don't be afraid to be creative in figuring out how to define words
4. Think about edge cases, but don't obsess
5. Content over style -> the UI matters to the extent that we need to be able to easily visually see your output. If your solution/output doesn't work or make sense, the UI will not help you fake it
6. Be aware that many n-grams may be in their own unique category with no other matches. Or that there are duplicate n-grams. It is up to you to come up with as little categories as possible though
