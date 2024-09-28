"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const LeetCodeCalculator = () => {
  const [hours, setHours] = useState<string>("0");
  const [minutes, setMinutes] = useState<string>("0");
  const [duration, setDuration] = useState<string>("");
  const [durationUnit, setDurationUnit] = useState<"days" | "weeks" | "months">(
    "days",
  );
  const [difficulties, setDifficulties] = useState({
    easy: false,
    medium: false,
    hard: false,
  });
  const [experience, setExperience] = useState<
    "beginner" | "normal" | "experienced"
  >("normal");
  const [result, setResult] = useState<number | null>(null);

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

    const selectedDifficulties = Object.entries(difficulties).filter(
      ([, isSelected]) => isSelected,
    );
    if (selectedDifficulties.length === 0) {
      alert("Please select at least one difficulty level.");
      return;
    }

    const averageTime =
      selectedDifficulties.reduce((acc, [difficulty]) => {
        switch (difficulty) {
          case "easy":
            return acc + 20;
          case "medium":
            return acc + 60;
          case "hard":
            return acc + 120;
          default:
            return acc;
        }
      }, 0) / selectedDifficulties.length;

    let timePerProblem = averageTime;

    if (experience === "experienced") {
      timePerProblem /= 2;
    } else if (experience === "beginner") {
      timePerProblem *= 2;
    }

    const totalProblems: number = Math.floor(
      (timePerDay * durationDays) / timePerProblem,
    );
    setResult(totalProblems);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            LeetCode Progress Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="hours">Hours</Label>
                <Select value={hours} onValueChange={setHours}>
                  <SelectTrigger id="hours">
                    <SelectValue placeholder="Hours" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(24)].map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} hours
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="minutes">Minutes</Label>
                <Select value={minutes} onValueChange={setMinutes}>
                  <SelectTrigger id="minutes">
                    <SelectValue placeholder="Minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 15, 30, 45].map((min) => (
                      <SelectItem key={min} value={min.toString()}>
                        {min} min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Enter duration"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="durationUnit">Unit</Label>
                <Select
                  value={durationUnit}
                  onValueChange={(value: "days" | "weeks" | "months") =>
                    setDurationUnit(value)
                  }
                >
                  <SelectTrigger id="durationUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Difficulty Levels</Label>
              <div className="flex space-x-4 mt-2">
                {(["easy", "medium", "hard"] as const).map((diff) => (
                  <div key={diff} className="flex items-center">
                    <Checkbox
                      id={diff}
                      checked={difficulties[diff]}
                      onCheckedChange={(checked) =>
                        setDifficulties((prev) => ({
                          ...prev,
                          [diff]: checked === true,
                        }))
                      }
                    />
                    <Label htmlFor={diff} className="ml-2 capitalize">
                      {diff}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select
                value={experience}
                onValueChange={(value: "beginner" | "normal" | "experienced") =>
                  setExperience(value)
                }
              >
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="experienced">Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateProblems} className="w-full">
              Calculate
            </Button>

            {result !== null && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">
                  You can solve approximately {result} problems!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeetCodeCalculator;
