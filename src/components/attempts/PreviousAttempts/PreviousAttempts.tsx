import React from "react";

import type { IAttempt } from "../../../types";
import Attempt from "../Attempt/Attempt";

import styles from "./PreviousAttempts.module.css";

interface IProps {
  previousAttempts: IAttempt[];
}

const PreviousAttempts = (props: IProps) => {
  const { previousAttempts } = props;
  return (
    <div className={styles.previousAttempts}>
      {previousAttempts.map((previousAttempt, i) => (
        <Attempt key={i} attempt={previousAttempt} />
      ))}
    </div>
  );
};

export default PreviousAttempts;
