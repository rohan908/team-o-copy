import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, useMantineTheme, Text } from '@mantine/core';

export function Display() {
  const theme = useMantineTheme();
  const location = useLocation();

  // Safely handle missing state
  if (!location.state?.requestData) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text>No submission data found. Please submit the form again.</Text>
      </Flex>
    );
  }

  const { requestData } = location.state;

  // Format date because it is a date object
  const formatDate = (date: any) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return date; // Return as-is if already string
  };

  // Format time because  it's a Date object
  const formatTime = (time: any) => {
    if (time instanceof Date) {
      return time.toLocaleTimeString();
    }
    return time;
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      align="center"
      direction="column"
      p="xl"
    >
      <Text size="xl" fw={700} mb="lg">
        Service Request Submitted
      </Text>
      <Box
        bg="gray.1"
        p="xl"
        w="100%"
        maw="600px"
        style={{ borderRadius: theme.radius.md }}
      >
        <Text mb="sm"><strong>Name:</strong> {requestData.employeeName}</Text>
        <Text mb="sm"><strong>Hospital:</strong> {requestData.hospital}</Text>
        <Text mb="sm"><strong>Language:</strong> {requestData.label}</Text>
        <Text mb="sm"><strong>Date:</strong> {formatDate(requestData.selectedDate)}</Text>
        <Text mb="sm"><strong>Time:</strong> {formatTime(requestData.selectedTime)}</Text>
        <Text mb="sm"><strong>Room:</strong> {requestData.roomNumber}</Text>
        <Text mb="sm"><strong>Priority:</strong> {requestData.priority}</Text>
        <Text mb="sm"><strong>Status:</strong> {requestData.status}</Text>
        <Text><strong>Details:</strong> {requestData.description || 'N/A'}</Text>
      </Box>
    </Flex>
  );
}

export default Display;
