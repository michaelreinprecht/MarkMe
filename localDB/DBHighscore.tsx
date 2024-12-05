/*

This code is used for handling and accessing data on the sqlite database.
It allows saving new high scores, getting all high scores, and getting the high score for a specific mode.
There is no need to define if a new score is a highscore, this code will handle that.
All scores will be saved, but only highscores will keep the isHighScore flag as true.

*/

//https://docs.expo.dev/versions/latest/sdk/sqlite/
import * as SQLite from "expo-sqlite";

export type HighScore = {
  id: number;
  mode: string;
  score: number;
  date: string;
  isHighScore: boolean;
};

let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync("MarkMe.db");

  await db.runAsync(
    `CREATE TABLE IF NOT EXISTS highscores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mode TEXT,
        score INTEGER,
        date TEXT,
        isHighScore INTEGER
      );`
  );
};

export const getAllHighScores = async (): Promise<HighScore[]> => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const statement = await db.prepareAsync(
    "SELECT * FROM highscores WHERE isHighScore = 1"
  );

  let highScores: HighScore[] = [];
  try {
    const result = await statement.executeAsync<HighScore>();
    highScores = await result.getAllAsync(); // Fetch all results as an array
  } finally {
    await statement.finalizeAsync();
  }

  return highScores;
};

export const saveHighScore = async (mode: string, score: number) => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const date = new Date().toISOString();

  const statement = await db.prepareAsync(
    "SELECT * FROM highscores WHERE mode = $mode AND isHighScore = 1 LIMIT 1"
  );
  let data: HighScore | null;
  try {
    const result = await statement.executeAsync<HighScore>({
      $mode: mode,
    });

    data = await result.getFirstAsync();
  } finally {
    await statement.finalizeAsync();
  }

  await db.withTransactionAsync(async () => {
    let isHighScore = 0;
    if (!data || score > data.score) {
      isHighScore = 1;

      const updateStmt = await db.prepareAsync(
        "UPDATE highscores SET isHighScore = 0 WHERE mode = $mode AND isHighScore = 1"
      );
      try {
        await updateStmt.executeAsync({ $mode: mode });
      } finally {
        await updateStmt.finalizeAsync();
      }
    }

    const insertStmt = await db.prepareAsync(
      "INSERT INTO highscores (mode, score, date, isHighScore) VALUES ($mode, $score, $date, $isHighScore)"
    );
    try {
      await insertStmt.executeAsync({
        $mode: mode,
        $score: score,
        $date: date,
        $isHighScore: isHighScore,
      });
    } finally {
      await insertStmt.finalizeAsync();
    }
  });
};

export const getHighScore = async (mode: string) => {
  const statement = await db.prepareAsync(
    "SELECT * FROM highscores WHERE mode = $mode AND isHighScore = 1 LIMIT 1"
  );

  let data: HighScore | null;
  try {
    const result = await statement.executeAsync<HighScore>({
      $mode: mode,
    });

    data = await result.getFirstAsync();
  } finally {
    await statement.finalizeAsync();
  }

  return data;
};
