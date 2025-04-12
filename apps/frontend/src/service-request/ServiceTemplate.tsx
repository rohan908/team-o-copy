import {
  TextInput,
  Radio,
  Select,
  Checkbox,
  Textarea,
  Button,
  Flex,
  Title,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import MyTextArea from "./StyleComponents.tsx";

// creating props for the form
type FormProps = {
  onSubmitRequest: (requestData: RequestData) => void;
};

function Form({ onSubmitRequest }: FormProps) {
  // initiail values for reset functionality
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      priority: "",
      department: "",
      hospital: "",
      isUrgent: false,
      notes: "",
      status: "",
    },
  });

  const handleSubmit = () => {
    //mantines easy way to get all of the data from the form
    //const submitData: RequestData = form.getValues();

    // reseting all the data on submission
    form.reset();
    // getting the data to pass into request to display
    //onSubmitRequest(submitData);
  };

  return (
    // flexbox mostly to get the form centerd and make it dynamic to screen
    <Flex justify="center" align="center" style={{ width: "100vw" }}>
      <Paper bg="gray.2" p="xl" shadow="xl" radius="md" w="35%">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={2} ta="center" mb="md">
            Medical Device Request Form
          </Title>
          <MyTextArea newlabel="hello" />



          <TextInput
            label="First Name"
            placeholder="First Name"
            required
            {...form.getInputProps("firstName")}
            mb="md"
          />

          <TextInput
            label="Last Name"
            placeholder="Last Name"
            required
            {...form.getInputProps("lastName")}
            mb="md"
          />

          <Radio.Group
            label="Priority"
            required
            {...form.getInputProps("priority")}
            mb="md"
          >
            <Radio value="Low" label="Low" />
            <Radio value="Medium" label="Medium" />
            <Radio value="High" label="High" />
            <Radio value="Emergency" label="Emergency" />
          </Radio.Group>

          <TextInput
            label="Department Name"
            placeholder="e.g. Cardiology"
            required
            {...form.getInputProps("department")}
            mb="md"
          />

          <Select
            label="Hospital Location"
            placeholder="Select a hospital"
            data={[
              {
                value: "Brigham & Women’s Hospital Main Campus",
                label: "Brigham & Women’s Hospital Main Campus",
              },
              { value: "Chestnut Hill", label: "Chestnut Hill" },
              { value: "Faulkner Hospital", label: "Faulkner Hospital" },
              { value: "Patriot Place", label: "Patriot Place" },
            ]}
            required
            {...form.getInputProps("hospital")}
            mb="md"
          />

          <Checkbox
            label="Urgent replacement needed?"
            {...form.getInputProps("isUrgent")}
            mb="md"
          />

          <Textarea
            label="Additional Notes"
            placeholder="Enter extra details here..."
            {...form.getInputProps("notes")}
            mb="md"
          />

          <Select
            label="Status"
            placeholder="Select status"
            data={[
              { value: "Unassigned", label: "Unassigned" },
              { value: "Assigned", label: "Assigned" },
              { value: "Working", label: "Working" },
              { value: "Done", label: "Done" },
            ]}
            required
            {...form.getInputProps("status")}
            mb="md"
          />
          <Flex mt="lg">
            <Button type="submit" fullWidth mr="sm">
              Submit Request
            </Button>

            <Button fullWidth ml="sm" onClick={() => form.reset()}>
              Clear Form
            </Button>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}

export default Form;
