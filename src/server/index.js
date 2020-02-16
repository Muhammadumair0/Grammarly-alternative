const express = require('express');
const os = require('os');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const { getWordSuggestion, getAllMatchingWords } = require('./dictionary-model');
const stringSimilarity = require('string-similarity');

const specialCharaters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.post('/api/find-replaceable-words', (req, res) =>  {

    let responseObject = {
        success: true,
        body: null,
        message: ''
    }

    let { originalText } = req.body;
    originalText = originalText.replace(/["']/g, "").replace(/[^a-zA-Z ]/g, "").trim();
    let misspelledWords = [];
    let misspelledWordsWithSuggestion = [];
    let modifiedText = originalText;
    let words = splitTextToArray(originalText);
    getAllMatchingWords(originalText).then(result => {
        let foundWords = result.map(values => values.value).map(words => words.word);
        words.forEach(word => {
            if(!foundWords.includes(word.toLowerCase()) && !specialCharaters.test(word)) {
                misspelledWords.push(word);
            }
        })
        if(misspelledWords.length > 0) {
            //replace misspelled words and return updated text
            getWordSuggestion(misspelledWords).then(result => {
                let suggestedWords = result.map(values => values.value).map(words => words.word);
                if(suggestedWords.length > 0) {
                    //words suggestion found
                    misspelledWords.map(misspelledWord => {
                        let matchedWord = stringSimilarity.findBestMatch(misspelledWord, suggestedWords).bestMatch.target;
                        if(matchedWord) {
                            misspelledWordsWithSuggestion.push({
                                misspelledWord,
                                suggestedWord: matchedWord
                            })
                        }
                    })
                    misspelledWords.map(misspelledWord => {
                        let matchedSuggestedWord = misspelledWordsWithSuggestion.find(word => {
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
                    responseObject.body = {
                        originalText: '',
                        modifiedText: '',
                        misspelledWords: [],
                        message: 'No replaceable word(s) found'
                    };
                    res.send(responseObject);
                }
            }).catch(e => {
                responseObject.body = {
                    success: false,
                    originalText: '',
                    modifiedText: '',
                    misspelledWords: [],
                    message: e
                };
                res.send(responseObject);
            }).catch(e => {
                responseObject.body = {
                    success: false,
                    originalText: '',
                    modifiedText: '',
                    misspelledWords: [],
                    message: e
                };
                res.send(responseObject);
            });
        } else {
            //no misspelled word found in the text
            responseObject.body = {
                originalText: '',
                modifiedText: '',
                misspelledWords: [],
                message: 'No misspelled word found in the text!'
            };
            res.send(responseObject);
        }
    })
});

function splitTextToArray(text) {
    return text.split(" ");
}

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
