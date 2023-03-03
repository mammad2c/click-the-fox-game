import { useSyncExternalStore } from "react";

const createStore = <State>(initialState: State) => {
  type NewStateFunctionType = (currState: State) => State;

  let currentState = Object.assign({}, initialState || {}) as State;

  const listeners = new Set<(currentState: State) => void>();

  const getState = () => currentState;

  const subscribe = (listener: (currentState: State) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const setState = (newState: State | NewStateFunctionType) => {
    if (typeof newState === "function") {
      currentState = (newState as NewStateFunctionType)(currentState);
    } else {
      currentState = newState;
    }

    listeners.forEach((subscriber) => subscriber(currentState));
  };

  const resetState = () => {
    setState(initialState);
  };

  const useSelector = <SelectorOutput = State>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selector: (storeState: State) => SelectorOutput = (storeState) =>
      storeState as any,
  ) => {
    // const [localState, setLocalState] = useState<State>(selector(getState()));
    const localState = useSyncExternalStore(
      subscribe,
      () => selector(getState()),
      () => selector(getState()),
    );

    // useEffect(() => {
    //   const unsubscribe = subscribe((state) => setLocalState(selector(state)));

    //   return () => {
    //     if (unsubscribe) {
    //       unsubscribe();
    //     }
    //   };
    // }, []);

    return localState;
  };

  return {
    getState,
    setState,
    useSelector,
    subscribe,
    resetState,
  };
};

export { createStore };
