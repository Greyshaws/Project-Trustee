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
import {TrustContext} from "../../../context/trust-context"

//steps
import Step1 from "./Step1"
import Step2 from "./Step2"

const steps = [
  "How would you create one?",
  "Trust Details",
];

const optionalSteps = []; // holds the index of steps that are optional





const CreateTrust = () => {
  //   const [isTemplate, setIsTemplate] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [stepsCompleted, setStepsCompleted] = useState(0);


  const [title, setTitle] = useState("");
  const [description, setDescription ] = useState("");
  const [period, setPeriod ] = useState(0);
  const [beneficiaryData, setBeneficiaryData] =useState([])


  // step logic starts */ 
  const isStepOptional = (step) => {
    return optionalSteps.includes(step);
  };

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
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleConpleteStep = () => {
    setStepsCompleted((prevState) => prevState + 1)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0);

  };

  // step logic ends */


  

  const handleTitleChange = (_new) => {
    setTitle(_new)
  }

  const handlePeriodChange = (_new) => {
    setPeriod(_new)
  }

  const handleDescriptionChange = (_new) => {
    setDescription(_new)
  }

  const handleAddBeneficiary = (_beneficiary) => {
    let beneficiaryAlreadyExists = beneficiaryData.filter(ben => {
      return ben.beneficiaryAddress === _beneficiary.beneficiaryAddress
    }).length > 0

    if (beneficiaryAlreadyExists) {
      console.log("ben already exists")
      return
    }


    setBeneficiaryData((prevData) => [
          ...prevData,
          _beneficiary
      ])
    console.log("added working trust beneficiary")
  }

  const handleDeleteBeneficiary = (_address) => {
    let beneficiaries = [...beneficiaryData]

      let updatedBeneficiaries = beneficiaries.filter((ben) => {
        return ben.beneficiaryAddress !== _address
      })

      // console.log("item: ", updatedBeneficiaries)

      setBeneficiaryData((prevData) => [
        ...updatedBeneficiaries,
    ])
  }

  const handleEditBeneficiary = (_beneficiary) => {
    let filteredBeneficiaries = beneficiaryData.filter(ben => {
      return ben.beneficiaryAddress !== _beneficiary.beneficiaryAddress
    })


    setBeneficiaryData( [
      ...filteredBeneficiaries,
      _beneficiary
  ])
    console.log("added working trust beneficiary")
  }

  
  let canShowNext = (activeStep <= stepsCompleted)
  
   

  return (
    <Box>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} sx={{
            py: 2,
            mb: 2
          }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps} >
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === steps.length ? ( // If All stepps are completed
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All Done - you&apos;ve created a new trust.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Got to account</Button>
              </Box>
            </>
          ) : ( // couple of steps left to complete
            <>

                {(activeStep === 0) ? <Step1 
                onDone={handleConpleteStep} 
                title={title}
                description={description}
                period={period}
                beneficiaryData={beneficiaryData}
                onHandleTitleChange={handleTitleChange}
                onHandlePeriodChange={handlePeriodChange}
                onHandleDescriptionChange={handleDescriptionChange}
                onHandleAddBeneficiary={handleAddBeneficiary}
                onHandleDeleteBeneficiary={handleDeleteBeneficiary}
                onHandleEditBeneficiary={handleEditBeneficiary}
                /> : null}


                {(activeStep === 1) ? <Step2   /> : null}
                
                

                
            
                {/* Stepper Controls */}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2}} >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

               <Button onClick={handleNext} disabled={!canShowNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CreateTrust;
