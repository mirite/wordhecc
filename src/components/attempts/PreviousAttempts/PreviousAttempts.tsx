import React from "react";

import type { IAttempt } from "../../../types";
import Attempt from "../Attempt/Attempt";

import * as styles from "./PreviousAttempts.module.css";

interface IProps {
  previousAttempts: IAttempt[];
}

const PreviousAttempts = (props: IProps) => {
  const { previousAttempts } = props;
  return (
    <div className={styles.previousAttempts}>
      {previousAttempts.map((previousAttempt, i) => (
        <Attempt attempt={previousAttempt} key={i} />
      ))}
    </div>
  );
};

export default PreviousAttempts;
