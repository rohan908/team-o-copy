import React from "react"
import {Select, Textarea, Title} from "@mantine/core";

interface inputProps{
  inputLabel: string
  inputPlaceHolder: string
  inputData: string[]
  isRequired: true //////

}

export const MyTextArea: React.FC<inputProps> = ({ inputLabel,  }) => {
  return(
    <Textarea
      label = {inputLabel}
      placeholder = "Enter additional details here..."
      m="md"
      radius = "sm"
    >
    </Textarea>
);
};

export const MySelect: React.FC<inputProps> = ({ inputLabel , inputPlaceHolder, inputData}) => {
  return(
    <Select
      label = {inputLabel}
      placeholder = {inputPlaceHolder}
      data = {inputData}
      m="md"
      radius = "sm"
    >
    </Select>
  );
};


