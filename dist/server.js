/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/dictionary-model.ts":
/*!****************************************!*\
  !*** ./src/server/dictionary-model.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pgDB = __webpack_require__(/*! ./pg/pg-connection */ \"./src/server/pg/pg-connection.ts\");\r\nfunction getWordSuggestion(misspelledWords) {\r\n    misspelledWords = misspelledWords.map(function (misspelledWord) {\r\n        return '%' + misspelledWord.toLowerCase() + '%';\r\n    });\r\n    var query = \"SELECT *\"\r\n        + \" FROM json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem\"\r\n        + \" WHERE elem->>'word' LIKE ANY(ARRAY\" + JSON.stringify(misspelledWords).replace(/\"/g, '\\'') + \")\";\r\n    return pgDB.any(query);\r\n}\r\nfunction getAllMatchingWords(text) {\r\n    var words = splitTextToArray(text).map(function (word) { return word.toLowerCase(); }).join(\"','\");\r\n    var query = \"SELECT * FROM\"\r\n        + \" json_array_elements((SELECT dictionary_json->'words' from dictionary)::json) AS elem\"\r\n        + \" WHERE elem->>'word' IN ('\" + words + \"')\";\r\n    return pgDB.any(query);\r\n}\r\nfunction splitTextToArray(text) {\r\n    return text.trim().split(\" \");\r\n}\r\nmodule.exports = {\r\n    getWordSuggestion: getWordSuggestion,\r\n    getAllMatchingWords: getAllMatchingWords\r\n};\r\n\n\n//# sourceURL=webpack:///./src/server/dictionary-model.ts?");

/***/ }),

/***/ "./src/server/pg/pg-connection.ts":
/*!****************************************!*\
  !*** ./src/server/pg/pg-connection.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pgp = __webpack_require__(/*! pg-promise */ \"pg-promise\")();\r\nvar cn = {\r\n    host: 'ec2-34-192-30-15.compute-1.amazonaws.com',\r\n    port: 5432,\r\n    database: 'd1j134osajc9pe',\r\n    user: 'ncidljgeqeyytr',\r\n    password: '58068161f57eb70bfb75e9a8653aec6d8ff751b242d0fb25b1c4889c44dfc923',\r\n    ssl: {\r\n        rejectUnauthorized: false,\r\n    }\r\n};\r\nmodule.exports = pgp(cn);\r\n\n\n//# sourceURL=webpack:///./src/server/pg/pg-connection.ts?");

/***/ }),

/***/ "./src/server/routes.ts":
/*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar router = express.Router();\r\nvar fuzz = __webpack_require__(/*! fuzzball */ \"fuzzball\");\r\nvar specialCharaters = /[ !@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]/;\r\nvar _a = __webpack_require__(/*! ./dictionary-model.ts */ \"./src/server/dictionary-model.ts\"), getWordSuggestion = _a.getWordSuggestion, getAllMatchingWords = _a.getAllMatchingWords;\r\nrouter.post('api/find-replaceable-words', function (req, res, next) {\r\n    var responseObject = {\r\n        success: true,\r\n        body: {\r\n            originalText: '',\r\n            modifiedText: '',\r\n            misspelledWords: [],\r\n            message: ''\r\n        }\r\n    };\r\n    var originalText = req.body.originalText;\r\n    originalText = originalText.replace(/[\"']/g, \"\").replace(/[^a-zA-Z ]/g, \"\").trim();\r\n    var misspelledWords = [];\r\n    var misspelledWordsWithSuggestion = [];\r\n    var modifiedText = originalText;\r\n    var words = splitTextToArray(originalText);\r\n    getAllMatchingWords(originalText).then(function (result) {\r\n        var foundWords = result.map(function (values) { return values.value; }).map(function (words) { return words.word; });\r\n        words.forEach(function (word) {\r\n            if (!foundWords.includes(word.toLowerCase()) && !specialCharaters.test(word)) {\r\n                misspelledWords.push(word);\r\n            }\r\n        });\r\n        if (misspelledWords.length > 0) {\r\n            //replace misspelled words and return updated text\r\n            getWordSuggestion(misspelledWords).then(function (result) {\r\n                var suggestedWords = result.map(function (values) { return values.value; }).map(function (words) { return words.word; });\r\n                if (suggestedWords.length > 0) {\r\n                    //words suggestion found\r\n                    misspelledWords.map(function (misspelledWord) {\r\n                        // let matchedWord = stringSimilarity.findBestMatch(misspelledWord, suggestedWords);\r\n                        var matchedWord = fuzz.extract(misspelledWord, suggestedWords)[0];\r\n                        if (Object.keys(matchedWord).length) {\r\n                            // matchedWord = stringSimilarity.findBestMatch(misspelledWord, suggestedWords).bestMatch.target;\r\n                            matchedWord = matchedWord[0];\r\n                            misspelledWordsWithSuggestion.push({\r\n                                misspelledWord: misspelledWord,\r\n                                suggestedWord: matchedWord\r\n                            });\r\n                        }\r\n                    });\r\n                    misspelledWords.map(function (misspelledWord) {\r\n                        var matchedSuggestedWord = misspelledWordsWithSuggestion.find(function (word) {\r\n                            return word.misspelledWord == misspelledWord;\r\n                        });\r\n                        modifiedText = modifiedText.replace(misspelledWord, matchedSuggestedWord.suggestedWord);\r\n                    });\r\n                    responseObject.body = {\r\n                        originalText: originalText,\r\n                        modifiedText: modifiedText,\r\n                        misspelledWords: misspelledWords,\r\n                        message: \"Following are misspelled words found in your text:\\n\" + misspelledWords.toString() + \".\\nDo you want to update the text ?\"\r\n                    };\r\n                    res.send(responseObject);\r\n                }\r\n                else {\r\n                    //no suggestion found\r\n                    responseObject.body.message = 'No replaceable word(s) found';\r\n                    res.send(responseObject);\r\n                }\r\n            }).catch(function (e) {\r\n                responseObject.success = false;\r\n                responseObject.body.message = e;\r\n                res.send(responseObject);\r\n            }).catch(function (e) {\r\n                responseObject.success = false;\r\n                responseObject.body.message = e;\r\n                res.send(responseObject);\r\n            });\r\n        }\r\n        else {\r\n            //no misspelled word found in the text\r\n            responseObject.body.message = 'No misspelled word found in the text!';\r\n            res.send(responseObject);\r\n        }\r\n    });\r\n});\r\nfunction splitTextToArray(text) {\r\n    return text.split(\" \");\r\n}\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes.ts\");\r\nvar cors = __webpack_require__(/*! cors */ \"cors\");\r\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nvar app = express();\r\napp.use(cors());\r\napp.use(bodyParser.json());\r\napp.use(express.static('public'));\r\napp.use(routes_1.default);\r\nvar port = process.env.PORT || 3000;\r\napp.listen(port, function () { return console.log(\"Server listening on port: \" + port); });\r\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fuzzball":
/*!***************************!*\
  !*** external "fuzzball" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fuzzball\");\n\n//# sourceURL=webpack:///external_%22fuzzball%22?");

/***/ }),

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg-promise\");\n\n//# sourceURL=webpack:///external_%22pg-promise%22?");

/***/ })

/******/ });