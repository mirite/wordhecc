import React from "react";
import { stateClasses, ILetter } from "../../../types";

interface IProps {
  letter: ILetter;
  onClick: () => void;
}

const Key = (props: IProps) => {
  const stateClass = stateClasses[props.letter.state];
  return (
    <button type="button" className={"btn btn-primary letter " + stateClass} onClick={props.onClick}>
      {props.letter.character}
    </button>
  );
};

export default Key;
