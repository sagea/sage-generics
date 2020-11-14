import { Event } from '../Event'

export function SetStateManager<State>(defaultState: State) {
  let state = defaultState;
  const changeEvent = Event();
  const getState = (): Readonly<State> => state;
  const setState = (callback: (state: Readonly<State>) => State) => {
    state = callback(getState());
    changeEvent.emit();
  }
  return Object.freeze({
    getState,
    setState,
    onChange: changeEvent.on,
  })
}
