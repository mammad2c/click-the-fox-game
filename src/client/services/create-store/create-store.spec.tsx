import { renderComponent, act, screen } from "@/tests/render-component";
import { createStore } from "./create-store";

const initialState = {
  counter: 0,
};

const counterStore = createStore(initialState);

const TestComponent = () => {
  const { counter } = counterStore.useSelector();

  return <div>current counter: {counter}</div>;
};

describe("createStore", () => {
  it("should initialize store", () => {
    const store = createStore(initialState);

    expect(store.getState().counter).toBe(initialState.counter);
  });

  it("should update store", () => {
    const store = createStore(initialState);

    store.setState({ counter: store.getState().counter + 1 });

    expect(store.getState().counter).toBe(1);

    store.setState({ counter: 4 });

    expect(store.getState().counter).toBe(4);

    store.setState((currentState) => {
      return { ...currentState, counter: currentState.counter + 1 };
    });

    expect(store.getState().counter).toBe(5);
  });

  it("should update component when state of store get changed", () => {
    renderComponent(<TestComponent />);

    act(() => {
      counterStore.setState({ counter: 1 });
    });

    expect(counterStore.getState().counter).toBe(1);

    expect(screen.getByText(/current counter: 1/)).toBeTruthy();
  });

  it("should reset the to initial state", () => {
    const store = createStore(initialState);

    store.resetState();

    expect(store.getState().counter).toBe(initialState.counter);
  });

  it("should accept custom subscribers", () => {
    const store = createStore(initialState);

    const subscriber = vi.fn();

    const unsubscribe = store.subscribe(subscriber);

    store.setState({ counter: 1 });

    expect(subscriber).toHaveBeenCalled();
    expect(subscriber).toHaveBeenCalledWith({
      counter: 1,
    });

    unsubscribe();

    store.setState({ counter: 2 });
    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
