const http = require('http');
const fs   = require('fs');
const url  = require('url');
const port = 8080;


var ngramData = require('./sorter.js');

var cat = ngramData.sortedNgrams;

var server = http.createServer (function (req, res) {
	var path = url.parse(req.url).pathname;
	switch (path) {
		case '/':
		case '/index.html':
			read('index.html', res, 'text/html');
		case '/style.css':
			read('style.css', res, 'text/css');
		case '/scripts.js':
			read('scripts.js', res, 'text/javascript');
	}
});

function read(path, res, contentType) {
	fs.readFile(path, function(error) {
		res.writeHead(200, {'Content-type': contentType})
		let body = ""
		var promiseTest = Promise.resolve(cat)

		promiseTest.then(data => {
			ngrams = data.categories

			let animals = ``;
			ngrams.finalAnimals.forEach((ngram) => {
				animals += `${ngram} - `
			})
			body += `<h1>Animal Related: </h1><p>${animals}</p><br />`

			let attributes = ``
			ngrams.finalAttributes.forEach((ngram) => {
				attributes += `${ngram} - `
			})
			body += `<h1>Ngrams that give attributes to other Ngrams: </h1><p>${attributes}</p><br />`

			let shapes = ``
			ngrams.finalShapes.forEach((ngram) => {
				shapes += `${ngram} - `
			})
			body += `<h1>Shape Related: </h1><p>${shapes}</p><br />`

			let food = ``
			ngrams.finalFood.forEach((ngram) => {
				food += `${ngram} - `
			})
			body += `<h1>Food Related: </h1><p>${food}</p><br />`

			let places = ``
			ngrams.finalPlaces.forEach((ngram) => {
				places += `${ngram} - `
			})
			body += `<h1>Places Related: </h1><p>${places}</p><br />`

			let person = ``
			ngrams.finalPerson.forEach((ngram) => {
				person += `${ngram} - `
			})
			body += `<h1>Person Related: </h1><p>${person}</p><br />`

			let possessions = ``
			ngrams.finalPossessions.forEach((ngram) => {
				possessions += `${ngram} - `
			})
			body += `<h1>Possessions Related: </h1><p>${possessions}</p><br />`

			let communication = ``
			ngrams.finalCommunication.forEach((ngram) => {
				communication += `${ngram} - `
			})
			body += `<h1>Communication Related: </h1><p>${communication}</p><br />`

			let motion = ``
			ngrams.finalMotions.forEach((ngram) => {
				motion += `${ngram} - `
			})
			body += `<h1>Motion Related: </h1><p>${motion}</p><br />`

			let substances = ``
			ngrams.finalSubstances.forEach((ngram) => {
				substances += `${ngram} - `
			})
			body += `<h1>Substances Related: </h1><p>${substances}</p><br />`

			let cognition = ``
			ngrams.finalCognition.forEach((ngram) => {
				cognition += `${ngram} - `
			})
			body += `<h1>Cognition Related: </h1><p>${cognition}</p><br />`

			let contentActions = ``
			ngrams.finalContentActions.forEach((ngram) => {
				contentActions += `${ngram} - `
			})
			body += `<h1>Content Action Related: </h1><p>${contentActions}</p><br />`

			let mActions = ``
			ngrams.finalMiscActions.forEach((ngram) => {
				mActions += `${ngram} - `
			})
			body += `<h1>Miscellanious Actions: </h1><p>${mActions}</p><br />`

			let descriptors = ``
			ngrams.finalDescriptors.forEach((ngram) => {
				descriptors += `${ngram} - `
			})
			body += `<h1>Ngrams that are descriptors for other Ngrams: </h1><p>${descriptors}</p><br />`

			let plants = ``
			ngrams.finalPlants.forEach((ngram) => {
				plants += `${ngram} - `
			})
			body += `<h1>Plant Related: </h1><p>${plants}</p><br />`

			let time = ``
			ngrams.finalTime.forEach((ngram) => {
				time += `${ngram} - `
			})
			body += `<h1>Time Related: </h1><p>${time}</p><br />`

			let creationActions = ``
			ngrams.finalCreationActions.forEach((ngram) => {
				creationActions += `${ngram} - `
			})
			body += `<h1>Creation Action Related: </h1><p>${creationActions}</p><br />`

			let artifacts = ``
			ngrams.finalArtifacts.forEach((ngram) => {
				artifacts += `${ngram} - `
			})
			body += `<h1>Man Made Objects (artifacts) Related: </h1><p>${artifacts}</p><br />`

			let objects = ``
			ngrams.finalObjects.forEach((ngram) => {
				objects += `${ngram} - `
			})
			body += `<h1>Object Related: </h1><p>${objects}</p><br />`

			let leftovers = ``
			ngrams.leftovers.forEach((ngram) => {
				leftovers += `${ngram} - `
			})
			body += `<h1>Ngrams with no Category: </h1><p>${leftovers}</p><br />`

			res.end(body, 'utf-8')
		})
	});
}



server.listen(process.env.PORT || port);
console.log('listening on http://localhost:8080');
