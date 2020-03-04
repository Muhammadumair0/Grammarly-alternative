export interface ResponseObject {
    success: Boolean;
    body: {
        originalText: string,
        modifiedText: string,
        misspelledWords: string[],
        message: string
    };
}

export interface MatchingWord {
    value: {
        word: string
    };
}

export interface SuggestedWord {
    misspelledWord: string,
    suggestedWord: string 
}

export interface WordObject {
    word: string
}