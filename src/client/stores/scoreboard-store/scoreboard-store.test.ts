import { tableLocalStorageKey } from "./config";
import { scoreboardStore } from "./scoreboard-store";

const person1 = {
  name: "Mohammad",
  score: 1,
};

const person2 = {
  name: "Jack",
  score: 4,
};

scoreboardStore.addNewRecord(person1);
scoreboardStore.addNewRecord(person2);

beforeEach(() => {
  scoreboardStore.resetState();
  localStorage.clear();
});

describe("ScoreboardStore", () => {
  it("should call the localStorage by any changes", () => {
    scoreboardStore.setState({
      table: [person1],
    });

    const table = JSON.parse(
      localStorage.getItem(tableLocalStorageKey) || "[]",
    );

    expect(table[0].name).toBe(person1.name);
    expect(table[0].score).toBe(person1.score);
  });

  it("should scoreboard table be sorted by score", () => {
    scoreboardStore.addNewRecord(person1);
    scoreboardStore.addNewRecord(person2);

    const { table } = scoreboardStore.getState();

    expect(table[0].name).toBe(person2.name);
  });

  it("should clear the scoreboard", () => {
    scoreboardStore.addNewRecord(person1);
    scoreboardStore.addNewRecord(person2);

    scoreboardStore.clearTable();

    const { table } = scoreboardStore.getState();

    expect(table.length).toBe(0);
  });
});
