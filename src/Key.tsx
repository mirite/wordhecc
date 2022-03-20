import React from 'react';
import * as styles from './styles/Key.module.css';
import {ELetterState, ILetter} from './types';

interface IProps {
  letter: ILetter,
  onClick: ()=>void;
}

const stateClasses: {[key in ELetterState]: string} = {
  [ELetterState.unused]: styles.unused,
  [ELetterState.notInWord]: styles.notInWord,
  [ELetterState.inPosition]: styles.inPosition,
  [ELetterState.inWord]: styles.inWord,
}

const Key = (props: IProps) => {
  const stateClass = stateClasses[props.letter.state];
  return (
    <button type="button" className={"btn btn-primary " + stateClass} onClick={props.onClick}>
      {props.letter.character}
    </button>
  );
};

export default Key;
