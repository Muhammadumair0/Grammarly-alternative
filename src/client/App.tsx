import React, { Component } from 'react';
const fileDownload = require('js-file-download');
import './scss/app.scss';


interface IAppState {
	name: string;
}
export default class App extends Component<any,any> {
	constructor(props: IAppState) {
		super(props);
		this.state = { originalText: '', apiOriginalText: '',modifiedText: '', misspelledWords: [], submitToggle: false, message: '', downloadButtonToggle: true };
	}
  componentDidMount() {
  }

  submit = () => {
    this.setState({ submitToggle: true }, () => {
      fetch('/api/find-replaceable-words', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ originalText: this.state.originalText }) 
      })
          .then(res => {
            this.setState({ submitToggle: false })
            return res.json();
          })
          .then(result => {
            this.setState({
              modifiedText: result.body.modifiedText,
              apiOriginalText: result.body.originalText,
              misspelledWords: result.body.misspelledWords,
              message: result.body.message
            }, () => {
              if(this.state.misspelledWords.length) {
                let dialogAnswer = confirm(this.state.message);
                if(dialogAnswer) {
                  this.setState({
                    originalText: this.state.modifiedText,
                    downloadButtonToggle: false
                  })
                }
              } else {
                alert(this.state.message);
              }
            })
          })
          .catch(e => {
              this.setState({ submitToggle: false });
          })
    });
  }

  undo = () => {
    if(this.state.misspelledWords.length) {
      this.setState({
        originalText: this.state.apiOriginalText
      })
    }
  }

  downloadFile = () => {
    fileDownload(this.state.modifiedText, 'filename.txt');
  }

  render() {
    const { originalText, submitToggle } = this.state;
    return (
      <div className={"mainGrid"}>
        <h2 className={"headerHeading"}>Spell checker</h2>
        <div>
          <textarea className={"textArea"} value={originalText} 
              onChange={(event) => this.setState({ originalText: event.target.value })} rows={30} cols={100}>
          </textarea>
        </div>
        <div className={"buttonsDiv"}>
          <button className={"submitButton"} disabled={submitToggle} onClick={this.submit}>
            Submit
          </button>
          {/* <button className={"undoButton"} onClick={this.undo}>
            Undo
          </button> */}
          <button disabled={this.state.downloadButtonToggle} className={"downloadButton"} onClick={this.downloadFile}>
            Download File (.txt)
          </button>
          </div>
      </div>
    );
  }
}
