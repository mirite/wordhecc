import React from "react";

import type { IKeyboard, ILetter } from "../../../types";
import KeyboardRow from "../KeyboardRow/KeyboardRow";

import * as styles from "./Keyboard.module.css";

interface IProps {
  isBackspaceEnabled: boolean;
  isEnterEnabled: boolean;
  keyboardState: IKeyboard;
  onBackClick: () => void;
  onEnterClick: () => void;
  onKeyClick: (letter: ILetter) => void;
}

const Keyboard = (props: IProps) => {
  const { keyboardState } = props;

  /**
   *
   * @param keyboard
   */
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
      {letters.map((row, rIndex) => (
        <KeyboardRow
          isBackspaceEnabled={props.isBackspaceEnabled}
          isEnterEnabled={props.isEnterEnabled}
          key={rIndex}
          onBackClick={() => props.onBackClick()}
          onEnterClick={() => props.onEnterClick()}
          onKeyClick={(e) => props.onKeyClick(e)}
          rIndex={rIndex}
          row={row}
        />
      ))}
    </div>
  );
};

export default Keyboard;
