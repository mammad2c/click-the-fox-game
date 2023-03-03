import { uuid4 } from "@/shared";
import { tableLocalStorageKey } from "./config";
import { scoreboardStore } from "./scoreboard-store";

beforeEach(() => {
  localStorage.clear();
});

describe("ScoreboardStore", () => {
  it("should call the localStorage by any changes", () => {
    const scoreboardItem = {
      name: "Mohammad",
      score: 1,
      date: new Date().toDateString(),
    };

    scoreboardStore.setState({
      table: [scoreboardItem],
    });

    const table = JSON.parse(
      localStorage.getItem(tableLocalStorageKey) || "[]",
    );

    expect(table[0].name).toBe(scoreboardItem.name);
    expect(table[0].score).toBe(scoreboardItem.score);
    expect(table[0].date).toBe(scoreboardItem.date);
  });

  it("should scoreboard table be sorted by score", () => {
    const person1 = {
      name: "Mohammad",
      score: 1,
      date: new Date().toDateString(),
      id: uuid4(),
    };

    const person2 = {
      name: "Jack",
      score: 4,
      date: new Date().toDateString(),
      id: uuid4(),
    };

    scoreboardStore.addNewRecord(person1);
    scoreboardStore.addNewRecord(person2);

    const { table } = scoreboardStore.getState();

    expect(table[0].name).toBe(person2.name);
  });
});
