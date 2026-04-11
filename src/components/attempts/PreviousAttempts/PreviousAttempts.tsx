import type { IAttempt } from "../../../types.js";
import Attempt from "../Attempt/Attempt.js";

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
