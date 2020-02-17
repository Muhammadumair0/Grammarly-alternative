const fuzz = require('fuzzball');
const specialCharaters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
import { DictionaryModel } from './words-dictionary.model';

export class WordsDictionaryController {

    static replaceMisspelledWords(req:any, res:any) {
        let responseObject:any = {
            success: true,
            body: {
                originalText: '',
                modifiedText: '',
                misspelledWords: [],
                message: ''
            }
        }
    
        let { originalText } = req.body;
        originalText = originalText.replace(/["']/g, "").replace(/[^a-zA-Z ]/g, "").trim();
        let misspelledWords:any = [];
        let misspelledWordsWithSuggestion:any = [];
        let modifiedText:any = originalText;
        let words:any = splitTextToArray(originalText);
        DictionaryModel.getAllMatchingWords(originalText).then((result:any) => {
            let foundWords = result.map((values:any) => values.value).map((words:any) => words.word);
            words.forEach((word:any) => {
                if(!foundWords.includes(word.toLowerCase()) && !specialCharaters.test(word)) {
                    misspelledWords.push(word);
                }
            })
            if(misspelledWords.length > 0) {
                //replace misspelled words and return updated text
                DictionaryModel.getWordSuggestion(misspelledWords).then((result:any) => {
                    let suggestedWords = result.map((values:any) => values.value).map((words:any) => words.word);
                    if(suggestedWords.length > 0) {
                        //words suggestion found
                        misspelledWords.map((misspelledWord:any) => {
                            // let matchedWord = stringSimilarity.findBestMatch(misspelledWord, suggestedWords);
                            let matchedWord = fuzz.extract(misspelledWord, suggestedWords)[0];
                            if(Object.keys(matchedWord).length) {
                                // matchedWord = stringSimilarity.findBestMatch(misspelledWord, suggestedWords).bestMatch.target;
                                matchedWord = matchedWord[0];
                                misspelledWordsWithSuggestion.push({
                                    misspelledWord,
                                    suggestedWord: matchedWord
                                })
                            }
                        })
                        misspelledWords.map((misspelledWord:any) => {
                            let matchedSuggestedWord = misspelledWordsWithSuggestion.find((word:any) => {
                                 return word.misspelledWord == misspelledWord;
                             })
                             modifiedText = modifiedText.replace(misspelledWord, matchedSuggestedWord.suggestedWord);
                         })                
                         responseObject.body = {
                             originalText,
                             modifiedText,
                             misspelledWords,
                             message: `Following are misspelled words found in your text:\n${misspelledWords.toString()}.\nDo you want to update the text ?`
                         }
                         res.send(responseObject);
                    } else {
                        //no suggestion found
                        responseObject.body.message = 'No replaceable word(s) found';
                        res.send(responseObject);
                    }
                }).catch((e:any) => {
                    responseObject.success = false;
                    responseObject.body.message = e;
                    res.send(responseObject);
                }).catch((e:any) => {
                    responseObject.success = false;
                    responseObject.body.message = e;
                    res.send(responseObject);
                });
            } else {
                //no misspelled word found in the text
                responseObject.body.message = 'No misspelled word found in the text!';
                res.send(responseObject);
            }
        })
    }

}

function splitTextToArray(text:any) {
    return text.split(" ");
}
