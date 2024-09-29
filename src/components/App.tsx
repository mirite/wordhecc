import Honeybadger from "@honeybadger-io/js";
import React from "react";

import { createStartingKeyboard, isKeyOnKeyboard } from "../helpers/create-keyboard.";
import { isInDictionary } from "../helpers/dictionary/dictionaryLoader";
import { stringFromAttempt } from "../helpers/wordChecker";
import type { IAttempt, ICheckWordResponse, IKeyboard, ILetter } from "../types";
import { ELetterState } from "../types";

import styles from "./App.module.css";
import CurrentAttempt from "./attempts/CurrentAttempt/CurrentAttempt";
import PreviousAttempts from "./attempts/PreviousAttempts/PreviousAttempts";
import Keyboard from "./keyboard/Keyboard/Keyboard";

interface IState {
  keyboard: IKeyboard;
  attempt: IAttempt;
  previousAttempts: IAttempt[];
  solved: boolean;
  stateCreated: number;
  error: string;
}


/**
 *
 */
class App extends React.Component<unknown, IState> {
  ref: React.RefObject<HTMLDivElement>;

  /**
   *
   * @param props
   */
  constructor() {
    super(undefined);
    const stateFromStorageString = window?.localStorage?.getItem("wordhecc");
    const currentUTCDate = new Date().getUTCDate();
    let stateToSet: IState = {
      solved: false,
      keyboard: createStartingKeyboard(),
      attempt: [],
      previousAttempts: [],
      stateCreated: currentUTCDate,
      error: "",
    };

    if (stateFromStorageString) {
      const stateFromStorage = JSON.parse(stateFromStorageString) as IState;
      if (stateFromStorage?.stateCreated === currentUTCDate) {
        stateToSet = stateFromStorage;
      }
    }
    this.state = stateToSet;
    this.ref = React.createRef();
  }

  /**
   *
   * @param newState
   */
  updateState(newState: Pick<IState, never>) {
    this.setState(newState, () => this.saveStateToStorage());
  }

  /**
   *
   */
  saveStateToStorage() {
    const stateToSave: IState = { ...this.state };

    if (window.localStorage) {
      window.localStorage.setItem("wordhecc", JSON.stringify(stateToSave));
    }
  }

  /**
   *
   */
  setSolved() {
    this.updateState({ solved: true });
  }

  /**
   *
   * @param attempt
   */
  setAttempt(attempt: IAttempt) {
    this.updateState({ attempt });
  }

  /**
   *
   * @param response
   */
  updateKeys(response: ICheckWordResponse) {
    const { keyboard } = this.state;
    const keys = [...keyboard];
    const { result } = response;

    const updateKeyState = (key: ILetter) => {
      const match = result.find((char) => char.character === key.character);
      if (!match) return;
      if (match.state > key.state) {
        key.state = match.state;
      }
    };

    for (const key of keys) {
      updateKeyState(key);
    }

    this.updateState({ keyboard: keys });
  }

  /**
   *
   * @param letter
   */
  addLetterToAttempt(letter: ILetter) {
    const { attempt } = this.state;
    const items = [...attempt];
    if (items.length >= 8) return;
    items.push({ character: letter.character, state: ELetterState.unused });
    this.setAttempt(items);
  }

  /**
   *
   */
  removeLetterFromAttempt() {
    const { attempt } = this.state;
    const items = [...attempt];
    items.pop();
    this.setAttempt(items);
  }

  /**
   *
   */
  async submitAttempt() {
    const { attempt, previousAttempts } = this.state;
    const attemptAsString = stringFromAttempt(attempt);
    const previousAttemptsStrings = previousAttempts.length ? previousAttempts.map((a) => stringFromAttempt(a)) : [];
    const result = await fetch("/.netlify/functions/check", {
      method: "POST",
      body: JSON.stringify({
        attempt: attemptAsString,
        count: previousAttemptsStrings.length + 1,
        previousAttempts: previousAttemptsStrings,
      }),
    }).catch((err) => {
      this.setState({ error: "A connection error occurred " + err.code });
    });
    if (!result || result.status !== 200) {
      this.setState({
        error: `A connection error occurred (${result?.status})`,
      });
      return;
    }
    const response = await result.json();
    if (response.error) {
      Honeybadger.notify(response.error);
      return;
    }
    this.updateAttempts(response as ICheckWordResponse);
    this.updateKeys(response as ICheckWordResponse);
    this.setState({ error: "" });
  }

  /**
   *
   * @param response
   */
  updateAttempts(response: ICheckWordResponse) {
    if (response.complete) this.setSolved();
    const { previousAttempts } = this.state;
    const oldPreviousAttempts = [...previousAttempts];
    oldPreviousAttempts.push(response.result);
    this.updateState({
      attempt: [],
      previousAttempts: oldPreviousAttempts,
    });
  }

  /**
   *
   * @param e
   */
  handleKeypress(e: KeyboardEvent) {
    if (this.state.solved) return;
    const { key } = e;
    if (key === "Backspace") {
      this.removeLetterFromAttempt();
      return;
    }

    if (key === "Enter" && isInDictionary(stringFromAttempt(this.state.attempt))) {
      this.submitAttempt();
      return;
    }
    if (!isKeyOnKeyboard(key)) return;
    this.addLetterToAttempt({
      character: key.toUpperCase(),
      state: ELetterState.unused,
      row: 0,
    });
  }

  /**
   *
   */
  componentDidMount() {
    window.addEventListener("keyup", (e) => this.handleKeypress(e));
  }

  /**
   *
   */
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeypress);
  }

  /**
   *
   */
  getSolvedText() {
    const { previousAttempts } = this.state;
    return (
      <div>
        <h1 className={styles.congratulations}>You did it!</h1>
        <p className="text-center">And it only took you {previousAttempts.length} tries!</p>
      </div>
    );
  }

  /**
   *
   */
  getKeyboard() {
    const { attempt, keyboard } = this.state;
    return (
      <Keyboard
        keyboardState={keyboard}
        onKeyClick={(letter: ILetter) => this.addLetterToAttempt(letter)}
        onBackClick={() => this.removeLetterFromAttempt()}
        onEnterClick={() => this.submitAttempt()}
        isEnterEnabled={isInDictionary(stringFromAttempt(attempt))}
        isBackspaceEnabled={attempt.length > 0}
      />
    );
  }

  /**
   *
   */
  render() {
    const { solved, attempt, previousAttempts, error } = this.state;

    return (
      <div className={styles.container} ref={this.ref}>
        <PreviousAttempts previousAttempts={previousAttempts} />
        <div>{error}</div>
        {solved ? (
          this.getSolvedText()
        ) : (
          <div>
            <CurrentAttempt attempt={attempt} /> {this.getKeyboard()}
          </div>
        )}
      </div>
    );
  }
}

export default App;
