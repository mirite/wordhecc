import React from "react";
import AttemptLetter from "../AttemptLetter/AttemptLetter";
import styles from "./Attempt.module.css";
import { IAttempt } from "../../../types";

interface IProps {
  attempt: IAttempt;
}
const Attempt = (props: IProps) => {
  return (
    <div className={styles.attempt}>
      {props.attempt.map((letter, i) => (
        <AttemptLetter key={i} letter={letter} />
      ))}
    </div>
  );
};

export default Attempt;
