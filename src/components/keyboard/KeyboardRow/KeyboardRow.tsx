import React from "react";

import type { ILetter } from "../../../types";
import ActionButton from "../ActiobButton/ActionButton";
import Key from "../Key/Key";
import Spacer from "../Spacer/Spacer";

import styles from "./KeyboardRow.module.css";


interface IProps {
  row: ILetter[];
  rIndex: number;
  onKeyClick: (letter: ILetter) => void;
  onBackClick: () => void;
  onEnterClick: () => void;
  isEnterEnabled: boolean;
  isBackspaceEnabled: boolean;
}

const KeyboardRow = (props: IProps) => {
  const { row, rIndex, onKeyClick, onBackClick, onEnterClick, isBackspaceEnabled, isEnterEnabled } = props;

  const rowTemplates = ["repeat(10, 1fr)", "0.5fr repeat(9, 1fr) 0.5fr", "1.5fr repeat(7, 1fr) 1.5fr"];

  const rowStyles = { gridTemplateColumns: rowTemplates[rIndex] };

  return (
    <div key={rIndex} className={styles.row} style={rowStyles}>
      {rIndex === 2 ? <ActionButton onClick={onEnterClick} enabled={isEnterEnabled} label={"Enter"} /> : ""}
      {rIndex === 1 ? <Spacer /> : ""}
      {row.map((letter) => (
        <Key key={letter.character} letter={letter} onClick={() => onKeyClick(letter)} />
      ))}
      {rIndex === 1 ? <Spacer /> : ""}
      {rIndex === 2 ? <ActionButton onClick={onBackClick} enabled={isBackspaceEnabled} label={"Backspace"} /> : ""}
    </div>
  );
};

export default KeyboardRow;
