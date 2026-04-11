import type { ILetter } from "../../../types.js";
import { stateClasses } from "../../../types.js";

interface IProps {
  letter: ILetter;
  onClick: () => void;
}

const Key = (props: IProps) => {
  const stateClass = stateClasses[props.letter.state];
  return (
    <button className={"btn btn-primary letter " + stateClass} onClick={props.onClick} type="button">
      {props.letter.character}
    </button>
  );
};

export default Key;
