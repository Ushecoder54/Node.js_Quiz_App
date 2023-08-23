const sqlite3 = require('sqlite3').verbose();

const DATABASE_PATH = './db/quiz.db';
const questionsData = require('./questions.json'); // Change path if needed

const db = new sqlite3.Database(DATABASE_PATH);

db.serialize(() => {
    // Create the questions table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY,
            question_text TEXT,
            answer_choices TEXT,
            correct_answer INTEGER
        )
    `);

    // Insert data from questionsData into the questions table
    const insertStmt = db.prepare(`
        INSERT INTO questions (question_text, answer_choices, correct_answer)
        VALUES (?, ?, ?)
    `);

    questionsData.forEach(question => {
        insertStmt.run(
            question.question_text,
            JSON.stringify(question.answer_choices),
            question.correct_answer
        );
    });

    insertStmt.finalize();
});

db.close();
