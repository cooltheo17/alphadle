import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
    const [letters, setLetters] = useState(Array(26).fill(''));
    const [currentLetter, setCurrentLetter] = useState('');
    const [gameStatus, setGameStatus] = useState('ongoing');

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



  return (
    <div className="alphabet-game-container">
      <h1 className="title">Alphadle</h1>
      <div className="status">
        <h2>Current Letter: {currentLetter}</h2>
        {gameStatus === 'victory' && <h2>Victory! You've placed all letters in order.</h2>}
        {gameStatus === 'fail' && <h2>Fail! No valid spaces left.</h2>}
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
    </div>
  );
};

export default Game;