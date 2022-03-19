import React from 'react';
import * as styles from './styles/AttemptLetter.module.css';
import {ILetter} from './types';
interface IProps {
  letter: ILetter;
}
const AttemptLetter = (props: IProps) => {
  return (
    <div className={styles.attemptLetter}>
      {props.letter.character}
    </div>
  );
};

export default AttemptLetter;
