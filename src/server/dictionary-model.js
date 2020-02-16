const pgDB = require('./pg/pg-connection');




function getWordSuggestion(misspelledWords) {

    misspelledWords = misspelledWords.map(misspelledWord => {
        return '%'+misspelledWord.toLowerCase()+'%';
    })


    let query = "SELECT *"
    + " FROM json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem"
    + " WHERE elem->>'word' LIKE ANY(ARRAY"+ JSON.stringify(misspelledWords).replace(/"/g, '\'') +")";

    return pgDB.any(query);
}

function getAllMatchingWords(text) {

    let words = splitTextToArray(text).map(word => word.toLowerCase()).join("','");

    let query = "SELECT * FROM"
              + " json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem"
              + " WHERE elem->>'word' IN ('"+ words +"')"

    return pgDB.any(query);

}

function splitTextToArray(text) {
    return text.trim().split(" ");
}

module.exports = {
    getWordSuggestion,
    getAllMatchingWords
}