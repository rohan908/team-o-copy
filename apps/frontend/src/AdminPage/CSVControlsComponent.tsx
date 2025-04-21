import { Box, Button, Collapse, Flex } from '@mantine/core';
import DatabaseController from "./DatabaseController"
import { useState } from "react";
import CSVTable from "./CSVTable.tsx";
import AdminPageV2 from "./AdminPageNewUI.tsx";

export function CSVControlsComponent() {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <Box>
      <DatabaseController table="directory" />

      {/* Toggle Button */}
      <Flex
        justify="center"
        mt="10px"
      >
        <Button
          color="#153A90"
          variant="outline"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          {showPreview ? 'Hide Directory Preview' : 'Preview Directory'}
        </Button>
      </Flex>

      {/* Collapsible CSV Table */}
      <Collapse in={showPreview} transitionDuration={200}>
        <div className="mt-4">
          <CSVTable table="directory" />
        </div>
      </Collapse>
    </Box>
  )
}

export default CSVControlsComponent;
