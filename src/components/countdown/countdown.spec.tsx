import { act, renderComponent, screen } from "@/tests/render-component";
import { Countdown } from "./countdown";

describe("Countdown", () => {
  it("should render in the correct format based on the duration where it is based on second", () => {
    // 30 seconds
    const { rerender } = renderComponent(<Countdown duration={30} />);
    expect(screen.getByText("00:00:30")).toBeTruthy();

    // 1 minute
    rerender(<Countdown duration={60} />);
    expect(screen.getByText("00:01:00")).toBeTruthy();

    // 59 seconds
    rerender(<Countdown duration={59} />);
    expect(screen.getByText("00:00:59")).toBeTruthy();

    // 1 minute and 19 seconds
    rerender(<Countdown duration={79} />);
    expect(screen.getByText("00:01:19")).toBeTruthy();

    // 1 minute and 1 second
    rerender(<Countdown duration={61} />);
    expect(screen.getByText("00:01:01")).toBeTruthy();

    // 0 value
    rerender(<Countdown duration={0} />);
    expect(screen.getByText("00:00:00")).toBeTruthy();

    // negative value
    rerender(<Countdown duration={-50} />);
    expect(screen.getByText("00:00:00")).toBeTruthy();

    // 5 minutes and 20 seconds
    rerender(<Countdown duration={320} />);
    expect(screen.getByText("00:05:20")).toBeTruthy();

    // 20 minutes and 40 seconds
    rerender(<Countdown duration={1240} />);
    expect(screen.getByText("00:20:40")).toBeTruthy();

    // 20 hours and 30 minutes and 30 seconds
    rerender(<Countdown duration={73830} />);
    expect(screen.getByText("20:30:30")).toBeTruthy();
  });

  it("should start countdown and continue until it reaches 0", () => {
    vi.useFakeTimers();

    // 30 seconds
    const { rerender } = renderComponent(
      <Countdown duration={30} canStart={true} />,
    );

    // first check 15 seconds passed
    act(() => {
      vi.advanceTimersByTime(15 * 1000);
    });
    expect(screen.getByText("00:00:15")).toBeTruthy();

    // now check it reaches 0 and stop
    act(() => {
      vi.advanceTimersByTime(30 * 1000);
    });
    expect(screen.getByText("00:00:00")).toBeTruthy();

    // 20 hours and 30 minutes and 30 seconds
    rerender(<Countdown duration={73830} canStart={true} />);

    // check 10 hours passed
    act(() => {
      vi.advanceTimersByTime(36000 * 1000);
    });
    expect(screen.getByText("10:30:30")).toBeTruthy();

    // now check it reaches 0 and stop
    act(() => {
      vi.advanceTimersByTime(40000 * 1000);
    });
    expect(screen.getByText("00:00:00")).toBeTruthy();
  });
});
