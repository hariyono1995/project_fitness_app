import React, { useState } from "react";
import { Box } from "@mui/material";

import { HeroBanner } from "components/HeroBanner";
import { SearchExercises } from "components/SearchExercises";
import { Exercises } from "components/Exercise";

export const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        bodyPart={bodyPart}
        setExercises={setExercises}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};
