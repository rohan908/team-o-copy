import { useContext, useState} from 'react';
import { useMantineTheme, Box, Flex, TextInput, Menu} from '@mantine/core'
import { useForm } from '@mantine/form'
import {MapContext, MapEditorProps} from '../MapEditor.tsx';
import {BlackButton} from "../../common-compoents/commonButtons.tsx";

const NodeInfoBox = () => {

  const MapData = useContext(MapContext);
  const theme = useMantineTheme();
  const collapsed = false;

  const [opened, setOpened] = useState(true);

  const handleUpdateNodeData = () => {
    // Get values from form
    const values = form.getValues();
    const x = parseFloat(values.xpos); // convert from string to float
    const y = parseFloat(values.ypos);
    const floorNum = parseInt(values.floor);

    // Validate values
    if (isNaN(x) || isNaN(y) || isNaN(floorNum)) {
      console.log(x, y, floorNum);
      alert('Please enter valid numbers for X, Y, and Floor');
      return;
    }

    if (MapData.updateNodePosition) {
      MapData.updateNodePosition(x, y, floorNum);
    }
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      xpos: 'Select a node',
      ypos: 'Select a node',
      floor: 'Select a node',
    },
  });

  return (
    <Box>

      <TextInput
        label="X Position"
        placeholder="Select a node"
        disabled={!MapData.nodeSelected}
        key={form.key('xpos')}
        {...form.getInputProps('xpos')}
      ></TextInput>
      <TextInput
        label="Y Position"
        placeholder="Select a node"
        disabled={!MapData.nodeSelected}
        key={form.key('ypos')}
        {...form.getInputProps('ypos')}
      ></TextInput>
      <TextInput
        label="Floor"
        placeholder="Select a node"
        disabled={!MapData.nodeSelected}
        key={form.key('floor')}
        {...form.getInputProps('floor')}
      ></TextInput>

    </Box>
  );
}

export default NodeInfoBox;
