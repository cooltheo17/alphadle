import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
    const [letters, setLetters] = useState(Array(26).fill(''));
    const [currentLetter, setCurrentLetter] = useState('');
    const [gameStatus, setGameStatus] = useState('ongoing');
    const [alphabetVisible, setAlphabetVisible] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
    setCurrentLetter(getRandomLetter());
    }, []);

    function getRandomLetter(newLetters){
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function checkWin(arr) {
        const letterArray = arr.filter(char => char !== '')
        if (letterArray && letterArray.length === 26 && gameStatus !== 'fail'){
          return true}
        }

    function getNextLetter(newLetters){
        if (checkWin(newLetters)){
            setGameStatus('victory');
            return
        }
        const nextLetter = getRandomLetter()
            if (canPlaceLetter(newLetters, nextLetter)){
                return nextLetter
            }
            else {
                setGameStatus('fail')
                return nextLetter
            }
    }

    function canPlaceLetter(arr, letter) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === '') {
                    let newArray = arr.slice();
                    newArray[i] = letter;
                    let lettersOnly = newArray.filter(char => char !== '');
                    let isSorted = true;
                    for (let j = 1; j < lettersOnly.length; j++) {
                        if (lettersOnly[j] < lettersOnly[j - 1]) {
                            isSorted = false;
                            break;
                        }
                    }
                    if (isSorted) {
                        return true;
                }
              }
            }
            return false;
          }

    const handlePlaceLetter = (index) => {
        if (letters[index] === '' && gameStatus === 'ongoing') {
            const newLetters = [...letters];
            newLetters[index] = currentLetter;
            setLetters(newLetters);
            setCurrentLetter(getNextLetter(newLetters));
        }
    };

    const handleReset = () => {
        setLetters(Array(26).fill(''));
        setCurrentLetter(getRandomLetter());
        setGameStatus('ongoing');
    };

    const toggleAlphabet = () => {
        setAlphabetVisible(!alphabetVisible);
    };

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    };



  return (
<div className="alphabet-game-container">
      <h1 className="title">Alphabet Game</h1>
      <div className="controls">
        <button className="toggle-button" onClick={toggleAlphabet}>
          {alphabetVisible ? 'Hide Alphabet' : 'Show Alphabet'}
        </button>
        <button className="info-button" onClick={toggleInstructions}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg>
        </button>
      </div>
      {showInstructions && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleInstructions}>
              &times;
            </span>
            <h2>Instructions</h2>
            <p>Place 26 letters in alphabetical order. If you cannot place a letter in the correct order, you lose. Duplicates can appear.</p>
          </div>
        </div>
      )}
      <div className="status">
        <h2>Current Letter: {currentLetter}</h2>
      </div>
      <div className="message">
          {gameStatus === 'victory' && <h2>🎉 Victory! All letters are in order.🥳 </h2>}
          {gameStatus === 'fail' && <h2>💣 Fail! No valid spaces left.👎 </h2>}
          {gameStatus === 'ongoing' && <h2>&nbsp;</h2>}
        </div>
      <div className="grid">
        {letters.map((letter, index) => (
          <div
            key={index}
            onClick={() => handlePlaceLetter(index)}
            className={`cell ${letter ? 'occupied' : ''}`}
          >
            {letter}
            <span className="cell-index">{index + 1}</span>
          </div>
        ))}
      </div>
      {alphabetVisible && (
        <div className="alphabet">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => (
            <div key={index} className="alphabet-letter">
              {letter}: {index + 1},
            </div>
          ))}
        </div>
      )}
      <button
        className={`reset-button ${gameStatus === 'fail' ? 'reset-button-fail' : ''}`}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default Game;