import React from "react";

import type { ILetter} from "../../../types";
import { stateClasses } from "../../../types";

import styles from "./AttemptLetter.module.css";

interface IProps {
  letter: ILetter;
}

const AttemptLetter = (props: IProps) => {
  const className = stateClasses[props.letter.state];
  return <div className={styles.attemptLetter + " " + className}>{props.letter.character}</div>;
};

export default AttemptLetter;
