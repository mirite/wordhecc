import type { IAttempt } from "../../../types.js";
import AttemptLetter from "../AttemptLetter/AttemptLetter.js";

import * as styles from "./Attempt.module.css";

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
