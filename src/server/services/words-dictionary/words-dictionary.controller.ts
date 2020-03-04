import { DictionaryModel } from './words-dictionary.model';
import { MatchingWord, ResponseObject, SuggestedWord, WordObject } from './words-dictionary.interface';
import * as express from 'express';

const fuzz = require('fuzzball');
const specialCharaters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;


export class WordsDictionaryController {

    static replaceMisspelledWords(req:express.Request, res:express.Response) {
        let responseObject: ResponseObject = {
            success: true,
            body: {
                originalText: '',
                modifiedText: '',
                misspelledWords: [],
                message: ''
            }
        }
    
        let { originalText } = req.body;
        originalText = originalText.replace(/["']/g, "").trim();
        let misspelledWords:string[] = [];
        let misspelledWordsWithSuggestion:SuggestedWord[] = [];
        let modifiedText:string = originalText;
        let words:string[] = splitTextToArray(originalText);
        DictionaryModel.getAllMatchingWords(originalText).then((result:MatchingWord[]) => {
            let foundWords = result.map((values:MatchingWord) => values.value).map((words: WordObject) => words.word);
            words.forEach((word:string) => {
                if(!foundWords.includes(word.toLowerCase()) && !specialCharaters.test(word)) {
                    misspelledWords.push(word);
                }
            })
            if(misspelledWords.length > 0) {
                //replace misspelled words and return updated text
                DictionaryModel.getWordSuggestion(misspelledWords).then((result:MatchingWord[]) => {
                    let suggestedWords = result.map((values:MatchingWord) => values.value).map((words:WordObject) => words.word);
                    if(suggestedWords.length > 0) {
                        //words suggestion found
                        misspelledWords.map((misspelledWord:string) => {
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
                        misspelledWords.map((misspelledWord:string) => {
                            let matchedSuggestedWord = misspelledWordsWithSuggestion.find((wordObj:SuggestedWord) => {
                                 return wordObj.misspelledWord == misspelledWord;
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
