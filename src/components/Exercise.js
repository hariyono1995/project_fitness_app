import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "utils/fetchData";

import { ExerciseCard } from "./ExerciseCard";

export const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises?.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
        setExercises(exercisesData);
      }
    };
    fetchExercisesData();
  }, [bodyPart]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>

      <Stack>
        <div className="exercise-info">
          {(currentExercises || []).map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>
      </Stack>

      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            color="standard"
            defaultPage={1}
            page={currentPage}
            size="large"
            onChange={paginate}
          />
        )}
      </Stack>
    </Box>
  );
};
