import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SimpleCounter from "./SimpleCounter";
import { Link } from "@mui/material";

const MINUTE = 60 * 1000; // in ms

const steps = [
  {
    label: "7 minutes",
    timeInMs: 7 * MINUTE,
  },
  {
    label: "5 minutes",
    timeInMs: 5 * MINUTE,
  },
  {
    label: "3 minutes",
    timeInMs: 3 * MINUTE,
  },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Get ready!</StepLabel>
          <StepContent>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Start
            </Button>
          </StepContent>
        </Step>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <SimpleCounter title={step.label} timeout={step.timeInMs} />
              <Box sx={{ mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep > steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
      <Typography variant="caption" sx={{ mt: 2 }} component="div">
        Sound Effect by{" "}
        <Link href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=124464">
          Universfield
        </Link>{" "}
        from{" "}
        <Link href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=124464">
          Pixabay
        </Link>
      </Typography>
    </Box>
  );
}
