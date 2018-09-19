var importedData = require('./scripts.js');

var data = importedData.ngrams.all;

const WordPOS = require('wordpos');
const wordpos = new WordPOS();
const natural = require('natural');
const wordnet = new natural.WordNet();
const wd = require('word-definition');
var nounInflector = new natural.NounInflector();

// returns words related to query
const finder = (data, query) => {
  var results = [];

  data.forEach((object) => {
    let included = false;
    let word = object.ngram;

    object.ngramData.forEach((info) => {
      if(info.lexName.includes(query)){
        included = true;
      }
    });

    if(included){
      results.push(word);
    }

  });
  return results;
};

// converts all strings to lowercase
const lower = (data) => {
  let results = [];

  data.forEach((ngram) => {
    results.push(ngram.toLowerCase());
  });

  return results;
};

// filters repeats from array
const filter = (array) => {
 let results = [];
 let sorted = array.sort((a, b) => a.length - b.length);

 sorted.forEach((ngram) => {
   if(!results.includes(ngram)){
     results.push(ngram);
   }
 });
 return results;
};

// converts to lower case and removes duplicates of wordpos data from ngrams
const sortTypes = (data) => {
  let nounsRepeats = lower(data.nouns);
  let nouns = filter(nounsRepeats);
  let adjectivesRepeats = lower(data.adjectives);
  let adjectives = filter(adjectivesRepeats);
  let verbsRepeats = lower(data.verbs);
  let verbs = filter(verbsRepeats);
  let adverbsRepeats = lower(data.adverbs);
  let adverbs = filter(adverbsRepeats);
  let restRepeats = lower(data.rest);
  let rest = filter(restRepeats);
  let categories = {
    nouns: nouns,
    adjectives: adjectives,
    verbs: verbs,
    adverbs: adverbs,
    rest: rest
  };
  return categories;
};

// sort ngrams that are not a noun, adjective, adverb or verb into related categories
const sortRest = (rest, array) => {
  let insert = [];

  rest.forEach((ngram) => {
    let included = false;

    ngram.split(' ').forEach((word) => {
      if (array.includes(word)) {
        included = true;
      }
    });

    if (included) {
      insert.push(ngram);
    }
  });
  return array.concat(insert);
};

// parent function for sorting categories, returns object containing sorted categories
async function assignCategories(ngramData) {
  let dataTypes = await wordpos.getPOS(ngramData);
  let filteredData = sortTypes(dataTypes);
  let nounResults = [];
  let verbResults = [];
  let adverbResults = [];
  let adjectiveResults = [];
  let restResults = filteredData.rest;


  // create ngram objects with all information (definitions, synonyms...etc) for nouns
  for(let ngram of filteredData.nouns){
    let ngramInfo = await wordpos.lookupNoun(ngram);
    let info = {
      ngram,
      ngramData: ngramInfo
    };
    nounResults.push(info);
  }
  // create ngram objects with all information (definitions, synonyms...etc) for verbs
  for(let ngram of filteredData.verbs){
    let ngramInfo = await wordpos.lookupVerb(ngram);
    let info = {
      ngram,
      ngramData: ngramInfo
    };
    verbResults.push(info);
  }
  // create ngram objects with all information (definitions, synonyms...etc) for adverbs
  for(let ngram of filteredData.adverbs){
    let ngramInfo = await wordpos.lookupAdverb(ngram);
    let info = {
      ngram,
      ngramData: ngramInfo
    };
    adverbResults.push(info);
  }
  // create ngram objects with all information (definitions, synonyms...etc) for adjectives
  for(let ngram of filteredData.adjectives){
    let ngramInfo = await wordpos.lookupAdjective(ngram);
    let info = {
      ngram,
      ngramData: ngramInfo
    };
    adjectiveResults.push(info);
  }

  let allResults = nounResults.concat(verbResults, adjectiveResults, adverbResults);
  let animals = finder(allResults, "animal");
  let attributes = finder(allResults, "attribute");
  let shapes = finder(allResults, "shape");
  let food = finder(allResults, "food");
  let places = finder(allResults, "location");
  let person = finder(allResults, "person");
  let possessions = finder(allResults, "possession");
  let communication = finder(allResults, "communication");
  let motions = finder(allResults, "motion");
  let substances = finder(allResults, "substance");
  let cognition = finder(allResults, "cognition");
  let contentActions = finder(allResults, "contact");
  let actions = finder(allResults, "act");
  let descriptors = finder(allResults, "adj.all");
  let plants = finder(allResults, "plant");
  let time = finder(allResults, "time");
  let creationActions = finder(allResults, "creation");
  let artifacts  = finder(allResults, "artifact");
  let objects = finder(allResults, "object");

  // ngrams related to animals
  let finalAnimals = sortRest(restResults, animals);
  // ngrams that give attributes to other words
  let finalAttributes = sortRest(restResults, attributes);
  // ngrams that are related to shapes
  let finalShapes = sortRest(restResults, shapes);
  // ngrams that are related to food
  let finalFood = sortRest(restResults, food);
  // ngrams that are related to locations
  let finalPlaces = sortRest(restResults, places);
  // ngrams that are related to people
  let finalPerson = sortRest(restResults, person);
  // ngrams that are related to possessions
  let finalPossessions = sortRest(restResults, possessions);
  // ngrams that are related to communication
  let finalCommunication = sortRest(restResults, communication);
  // ngrams that are related to motion
  let finalMotions = sortRest(restResults, motions);
  // ngrams that are related to substances
  let finalSubstances = sortRest(restResults, substances);
  // ngrams that are related to cognition
  let finalCognition = sortRest(restResults, cognition);
  // ngrams that are contact actions
  let finalContentActions = sortRest(restResults, contentActions);
  // ngrams that are miscellanious actions
  let finalMiscActions = sortRest(restResults, actions);
  // ngrams that are descriptors for other words
  let finalDescriptors = sortRest(restResults, descriptors);
  // ngrams that are related to related to plants
  let finalPlants = sortRest(restResults, plants);
  // ngrams that are related to related to time
  let finalTime = sortRest(restResults, time);
  // ngrams that are creation actions
  let finalCreationActions = sortRest(restResults, creationActions);
  // ngrams that are man made objects
  let finalArtifacts = sortRest(restResults, artifacts);
  // ngrams that are objects
  let finalObjects = sortRest(restResults, objects);

  let allSortedNgrams = finalAnimals.concat(
    finalAttributes,
    finalShapes,
    finalFood,
    finalPlaces,
    finalPerson,
    finalPossessions,
    finalCommunication,
    finalMotions,
    finalSubstances,
    finalCognition,
    finalContentActions,
    finalMiscActions,
    finalDescriptors,
    finalPlants,
    finalTime,
    finalCreationActions,
    finalArtifacts,
    finalObjects
  );

  let sortedData = data.sort((a, b) => a.length - b.length);
  let sortedDataLowered = lower(sortedData);

  // ngrams that are not included in any category
  let leftovers = [];

  sortedDataLowered.forEach((ngram) => {
    if (
      !allSortedNgrams.includes(ngram) &&
      !leftovers.includes(ngram)
    ) {
      leftovers.push(ngram);
    }
  });

  // final data object containing all ngrams sorted into pertinent categories
  let categorizedNgrams = {
    categories: {
      finalAnimals: finalAnimals,
      finalAttributes: finalAttributes,
      finalShapes: finalShapes,
      finalFood: finalFood,
      finalPlaces: finalPlaces,
      finalPerson: finalPerson,
      finalPossessions: finalPossessions,
      finalCommunication: finalCommunication,
      finalMotions: finalMotions,
      finalSubstances: finalSubstances,
      finalCognition: finalCognition,
      finalContentActions: finalContentActions,
      finalDescriptors: finalDescriptors,
      finalPlants: finalPlants,
      finalTime: finalTime,
      finalCreationActions: finalCreationActions,
      finalArtifacts: finalArtifacts,
      finalMiscActions: finalMiscActions,
      finalObjects: finalObjects,
      leftovers: leftovers
    }
  };

  return categorizedNgrams;
}

module.exports = {
  sortedNgrams: assignCategories(data)
}
