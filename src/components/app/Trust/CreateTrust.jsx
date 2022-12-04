import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TrustContext } from "../../../context/trust-context";

//steps
import Step1 from "./Step1";
import Step2 from "./Step2";

const steps = ["How would you create one?", "Trust Details"];

const optionalSteps = []; // holds the index of steps that are optional

const CreateTrust = () => {
  //   const [isTemplate, setIsTemplate] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [stepsCompleted, setStepsCompleted] = useState(0);

  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState(0);
  const [beneficiaryData, setBeneficiaryData] = useState([]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleConpleteStep = () => {
    setStepsCompleted((prevState) => prevState + 1);
    handleNext();
  };

  const handleTitleChange = (_new) => {
    setTitle(_new);
  };

  const handlePeriodChange = (_new) => {
    setPeriod(_new);
  };

  const handleDescriptionChange = (_new) => {
    setDescription(_new);
  };

  const handleAddBeneficiary = (_beneficiary) => {
    let beneficiaryAlreadyExists =
      beneficiaryData.filter((ben) => {
        return ben.beneficiaryAddress === _beneficiary.beneficiaryAddress;
      }).length > 0;

    if (beneficiaryAlreadyExists) {
      console.log("ben already exists");
      return;
    }

    setBeneficiaryData((prevData) => [...prevData, _beneficiary]);
    console.log("added working trust beneficiary");
  };

  const handleDeleteBeneficiary = (_address) => {
    let beneficiaries = [...beneficiaryData];

    let updatedBeneficiaries = beneficiaries.filter((ben) => {
      return ben.beneficiaryAddress !== _address;
    });

    // console.log("item: ", updatedBeneficiaries)

    setBeneficiaryData((prevData) => [...updatedBeneficiaries]);
  };

  const handleEditBeneficiary = (_beneficiary) => {
    let filteredBeneficiaries = beneficiaryData.filter((ben) => {
      return ben.beneficiaryAddress !== _beneficiary.beneficiaryAddress;
    });

    setBeneficiaryData([...filteredBeneficiaries, _beneficiary]);
    console.log("added working trust beneficiary");
  };

  let canShowNext = activeStep <= stepsCompleted;

  return (
    <Box>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Step1
            onDone={handleConpleteStep}
            title="Update Trust"
            description={description}
            period={period}
            beneficiaryData={beneficiaryData}
            onHandlePeriodChange={handlePeriodChange}
            onHandleDescriptionChange={handleDescriptionChange}
            onHandleAddBeneficiary={handleAddBeneficiary}
            onHandleDeleteBeneficiary={handleDeleteBeneficiary}
            onHandleEditBeneficiary={handleEditBeneficiary}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default CreateTrust;
