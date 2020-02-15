const express = require('express');
const os = require('os');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const spell = require('spell-checker-js');
const SpellChecker = require('simple-spellchecker');
spell.load('en');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.post('/api', (req, res) =>  {

    let responseObject = {
        success: true,
        body: null
    }

    const { originalText } = req.body;
    let modifiedText = originalText;
    let misspelledWords = spell.check(originalText);
    let misspelledWordsWithSuggestion = [];

    if(misspelledWords.length) {
        //find dictornay suggestions againt misspelled word and replace them.
        SpellChecker.getDictionary("en-US", function(err, result) {
            let dictionary = result;
            let wordsResult = [];
            misspelledWords.map(word => {
                let wordResult = dictionary.getSuggestions(word, 1);
                if(wordResult.length > 0) {
                    wordsResult.push({
                        misspelledWord: word,
                        suggestedWord: wordResult[0]
                    })
                    misspelledWordsWithSuggestion.push(word);
                }    
            })

            wordsResult.map(wordObj => {
                modifiedText = modifiedText.replace(wordObj.misspelledWord, wordObj.suggestedWord);
            })

            responseObject.body = {
                originalText,
                modifiedText,
                misspelledWords
            }
            res.send(responseObject);
        });
    } else {
        //no misspelled word found in the text
        responseObject.body = {
            originalText: '',
            modifiedText: '',
            misspelledWords: []
        };
        res.send(responseObject);
    }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
