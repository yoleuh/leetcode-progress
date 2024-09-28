"use client";
import React, { useState } from "react";

const Page = () => {
  const [hours, setHours] = useState("1");
  const [minutes, setMinutes] = useState("0");
  const [duration, setDuration] = useState("1");
  const [durationUnit, setDurationUnit] = useState("weeks");
  const [experience, setExperience] = useState("intermediate");
  const [difficulties, setDifficulties] = useState({
    easy: true,
    medium: true,
    hard: true,
  });
  const [result, setResult] = useState({ easy: 0, medium: 0, hard: 0 });

  const calculateProblems = () => {
    const timePerDay = parseInt(hours) * 60 + parseInt(minutes);
    let durationDays = parseFloat(duration);

    switch (durationUnit) {
      case "weeks":
        durationDays *= 7;
        break;
      case "months":
        durationDays *= 30;
        break;
    }

    const totalTime = timePerDay * durationDays;

    const difficultyTimes = {
      easy: 20,
      medium: 60,
      hard: 120,
    };

    const adjustedTimes = {
      easy: difficultyTimes.easy,
      medium: difficultyTimes.medium,
      hard: difficultyTimes.hard,
    };

    if (experience === "experienced") {
      adjustedTimes.easy /= 2;
      adjustedTimes.medium /= 2;
      adjustedTimes.hard /= 2;
    } else if (experience === "beginner") {
      adjustedTimes.easy *= 2;
      adjustedTimes.medium *= 2;
      adjustedTimes.hard *= 2;
    }

    const selectedDifficulties = Object.entries(difficulties).filter(
      ([, isSelected]) => isSelected
    );

    if (selectedDifficulties.length === 0) {
      alert("Please select at least one difficulty level.");
      return;
    }

    const timePerDifficulty = totalTime / selectedDifficulties.length;
    const totalProblems = { easy: 0, medium: 0, hard: 0 };

    selectedDifficulties.forEach(([difficulty]) => {
      const key = difficulty as keyof typeof totalProblems;
      totalProblems[key] = Math.floor(timePerDifficulty / adjustedTimes[key]);
    });

    setResult(totalProblems);
  };

  return (
    <div>
      <h1>LeetCode Progress Calculator</h1>
      <div>
        <label>
          Hours per day:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Minutes per day:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Duration:
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <select
          value={durationUnit}
          onChange={(e) => setDurationUnit(e.target.value)}
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </select>
      </div>
      <div>
        <label>
          Experience:
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Difficulties:
          <div>
            <label>
              <input
                type="checkbox"
                checked={difficulties.easy}
                onChange={(e) =>
                  setDifficulties({ ...difficulties, easy: e.target.checked })
                }
              />
              Easy
            </label>
            <label>
              <input
                type="checkbox"
                checked={difficulties.medium}
                onChange={(e) =>
                  setDifficulties({ ...difficulties, medium: e.target.checked })
                }
              />
              Medium
            </label>
            <label>
              <input
                type="checkbox"
                checked={difficulties.hard}
                onChange={(e) =>
                  setDifficulties({ ...difficulties, hard: e.target.checked })
                }
              />
              Hard
            </label>
          </div>
        </label>
      </div>
      <button onClick={calculateProblems}>Calculate</button>
      <div>
        <h2>Results</h2>
        <p>Easy: {result.easy}</p>
        <p>Medium: {result.medium}</p>
        <p>Hard: {result.hard}</p>
      </div>
    </div>
  );
};

export default Page;
