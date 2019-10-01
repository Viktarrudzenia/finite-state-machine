class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */

  constructor(config) {
    this.initial = config.initial;
    this.states = config.states;
    this.currentState = "normal";

    // for minimal history ... prev and next state;
    this.previousState = false;
    this.nextState = false;
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.currentState;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    // take all states like array, search state in this array and
    // if true -> start change state
    // if false -> throw Error message

    if (Object.keys(this.states).indexOf(state) != -1) {
      this.previousState = this.currentState;
      this.currentState = state;
      return this.currentState;
    } else {
      throw new Error(
        `${state} is not existing state of Finite Student Machine`
      );
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    // take current state.transitions like array, search event(trigger) in this array and
    // if true -> start change current state and write prev state (history)
    // if false -> throw Error message
    if (
      Object.keys(this.states[this.currentState].transitions).indexOf(event) !=
      -1
    ) {
      this.previousState = this.currentState;
      this.currentState = this.states[this.currentState].transitions[event];
    } else {
      throw new Error(
        `${event} is not existing transition of Finite Student Machine`
      );
    }
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    // reset all, include history
    this.previousState = false;
    this.currentState = "normal";
    this.nextState = false;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    // if event send in getStates ->
    // take array of states and filter it (search event and if find - leave it; else delete from array)
    if (event === undefined) {
      return Object.keys(this.states);
    } else {
      return Object.keys(this.states).filter(
        value => this.states[value].transitions[event] != undefined
      );
    }
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    // fallback with little history
    if (this.previousState === false) {
      return false;
    } else {
      this.nextState = this.currentState;
      this.currentState = this.previousState;
      this.previousState = false;
      return true;
    }
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    // step forward to next value (if use undo function it !== false)
    if (this.nextState === false) {
      return false;
    } else {
      this.previousState = this.currentState;
      this.currentState = this.nextState;
      this.nextState = false;
      return true;
    }
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    // clear only history, not state
    this.nextState = false;
    this.previousState = false;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
