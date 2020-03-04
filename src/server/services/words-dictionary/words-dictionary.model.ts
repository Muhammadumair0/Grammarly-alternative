import { pgDB } from '../../pg/pg-connection';


export class DictionaryModel {

static getWordSuggestionV1(misspelledWords:string[]) {

    misspelledWords = misspelledWords.map((misspelledWord:string) => {
        return '%'+misspelledWord.toLowerCase()+'%';
    })

    let query = "SELECT *"
    + " FROM json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem"
    + " WHERE elem->>'word' LIKE ANY(ARRAY"+ JSON.stringify(misspelledWords).replace(/"/g, '\'') +")";

    return pgDB.any(query);
}


static getWordSuggestionV2(misspelledWords:string[]) {

    let misspelledWordsString: string = misspelledWords.toString();

    //fuzzystrmatch extension added
    //pg_trgm threshold is 0.3 = %
    let query = "SELECT *"
    + " FROM json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem"
    + " WHERE (elem->>'word') % ANY(STRING_TO_ARRAY('" + misspelledWordsString + "',','))";

    return pgDB.any(query);
}


static getAllMatchingWords(text:string) {

    let words = splitTextToArray(text).map((word:string) => word.toLowerCase()).join("','");

    let query = "SELECT * FROM"
              + " json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem"
              + " WHERE elem->>'word' IN ('"+ words +"')"
    return pgDB.any(query);

}

}

function splitTextToArray(text:string) {
    return text.trim().split(" ");
}
