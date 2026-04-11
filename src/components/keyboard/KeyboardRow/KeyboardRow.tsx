import type { ILetter } from "../../../types.js";
import ActionButton from "../ActiobButton/ActionButton.js";
import Key from "../Key/Key.js";
import Spacer from "../Spacer/Spacer.js";

import * as styles from "./KeyboardRow.module.css";

interface IProps {
  isBackspaceEnabled: boolean;
  isEnterEnabled: boolean;
  onBackClick: () => void;
  onEnterClick: () => void;
  onKeyClick: (letter: ILetter) => void;
  rIndex: number;
  row: ILetter[];
}

const KeyboardRow = (props: IProps) => {
  const { isBackspaceEnabled, isEnterEnabled, onBackClick, onEnterClick, onKeyClick, rIndex, row } = props;

  const rowTemplates = ["repeat(10, 1fr)", "0.5fr repeat(9, 1fr) 0.5fr", "1.5fr repeat(7, 1fr) 1.5fr"];

  const rowStyles = { gridTemplateColumns: rowTemplates[rIndex] };

  return (
    <div className={styles.row} key={rIndex} style={rowStyles}>
      {rIndex === 2 ? <ActionButton enabled={isEnterEnabled} label={"Enter"} onClick={onEnterClick} /> : ""}
      {rIndex === 1 ? <Spacer /> : ""}
      {row.map((letter) => (
        <Key key={letter.character} letter={letter} onClick={() => onKeyClick(letter)} />
      ))}
      {rIndex === 1 ? <Spacer /> : ""}
      {rIndex === 2 ? <ActionButton enabled={isBackspaceEnabled} label={"Backspace"} onClick={onBackClick} /> : ""}
    </div>
  );
};

export default KeyboardRow;
