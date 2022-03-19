import React from 'react';
import Key from './Key';
import * as styles from './styles/Keyboard.module.css';
import {IKeyboard, ILetter} from './types';

interface IProps {
  keyboardState: IKeyboard;
  onClick: (letter: ILetter) => void;
}

const Keyboard = (props: IProps) => {
  const {keyboardState} = props;

  function keyboardIntoRows(keyboard: IKeyboard): ILetter[][] {
    const output: ILetter[][] = [[]];
    let rowIndex = 0;
    for (const letter of keyboard) {
      if (letter.row !== rowIndex) {
        rowIndex++;
        output.push([]);
      }
      output[rowIndex].push(letter);
    }
    return output;
  }

  const letters = keyboardIntoRows(keyboardState);

  return (
    <div className={styles.keyboard}>
      {letters.map((row, rIndex) =>
        <div key={rIndex} className={styles.row}>
          {row.map(letter => <Key key={letter.character} letter={letter}
                                  onClick={() => props.onClick(letter)}/>)}
        </div>)}
    </div>
  );
};

export default Keyboard;
