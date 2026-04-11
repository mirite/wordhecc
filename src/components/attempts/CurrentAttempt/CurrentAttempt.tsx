import type { IAttempt } from "../../../types.js";
import { ELetterState } from "../../../types.js";
import Attempt from "../Attempt/Attempt.js";

import * as styles from "./CurrentAttempt.module.css";

interface IProps {
  attempt: IAttempt;
}
const CurrentAttempt = (props: IProps) => {
  return (
    <div className={styles.word}>
      <Attempt attempt={props.attempt.length ? props.attempt : [{ character: "", state: ELetterState.unused }]} />
    </div>
  );
};

export default CurrentAttempt;
