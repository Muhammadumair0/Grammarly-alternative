const pgDB = require('../../pg/pg-connection');


export class DictionaryModel {

static getWordSuggestion(misspelledWords:any) {

    misspelledWords = misspelledWords.map((misspelledWord:any) => {
        return '%'+misspelledWord.toLowerCase()+'%';
    })


    let query = "SELECT *"
    + " FROM json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem"
    + " WHERE elem->>'word' LIKE ANY(ARRAY"+ JSON.stringify(misspelledWords).replace(/"/g, '\'') +")";

    return pgDB.any(query);
}

static getAllMatchingWords(text:any) {

    let words = splitTextToArray(text).map((word:any) => word.toLowerCase()).join("','");

    let query = "SELECT * FROM"
              + " json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem"
              + " WHERE elem->>'word' IN ('"+ words +"')"

    return pgDB.any(query);

}

}

function splitTextToArray(text:any) {
    return text.trim().split(" ");
}
