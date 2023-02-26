import { renderComponent, screen } from "@/tests/render-component";
import { Countdown } from "./countdown";

describe("Countdown", () => {
  it("should render in the correct format based on seconds", () => {
    const { rerender } = renderComponent(<Countdown time={30} />);

    expect(screen.getByText("00:00:30")).toBeTruthy();

    // 1 minute and 19 seconds
    rerender(<Countdown time={79} />);
    expect(screen.getByText("00:01:19")).toBeTruthy();

    // 1 minute and 1 second
    rerender(<Countdown time={61} />);
    expect(screen.getByText("00:01:01")).toBeTruthy();

    // 0 value
    rerender(<Countdown time={0} />);
    expect(screen.getByText("00:00:00")).toBeTruthy();

    // negative value
    rerender(<Countdown time={-50} />);
    expect(screen.getByText("00:00:00")).toBeTruthy();

    // 5 minutes and 20 seconds
    rerender(<Countdown time={320} />);
    expect(screen.getByText("00:05:20")).toBeTruthy();

    // 20 minutes and 40 seconds
    rerender(<Countdown time={1240} />);
    expect(screen.getByText("00:20:40")).toBeTruthy();

    // 20 hours and 30 minutes and 30 seconds
    rerender(<Countdown time={73830} />);
    expect(screen.getByText("20:30:30")).toBeTruthy();
  });
});
