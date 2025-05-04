import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from '@mantine/charts';
import { SegmentedControl, Loader, Center, Title, Box } from '@mantine/core';
import FilterGraph from "../Buttons/FilterGraph.tsx";

interface ChartData {
  [key: string]: string | number;
  count: number;
}

const StatsChart: React.FC = () => {
  const [groupBy, setGroupBy] = useState<'priority' | 'hospital' | 'employeeName'>('priority');
  const [type, setType] = useState<'bar' | 'pie'>('bar');
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  const blueShades = [
    '#74c0fc',
    '#5caffc',
    '#4dabf7',
    '#3e9ef2',
    '#339af0',
    '#2b8ae6',
    '#228be6',
    '#1f7cd6',
    '#1c7ed6',
    '#1971c2',
    '#1563a8',
    '#124f8f',
    '#0f3d75',
  ];



  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/graphSR?by=${groupBy}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch stats: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [groupBy]);

  return (
    <Box p="xl" bg="primaryBlues.1" w="100%" h="100%" bd="lg" flex="column">
      <Title order={1} mb="sm" c="secondaryBlues.7" ta="left" fz="xl">
        Service Requests Statistics
      </Title>
      <Box mb = 'md'>
      <FilterGraph value={groupBy} onChange={setGroupBy}/>
      </Box>
      <SegmentedControl
        fullWidth
        value={type}
        mb='md'
        onChange={(value) => setType(value as 'bar' | 'pie')}
        data={[
          { label: 'Bar Chart', value: 'bar' },
          { label: 'Pie Chart', value: 'pie' },
        ]}
      />

      {loading ? (
        <Center h={200}>
          <Loader />
        </Center>
      ) : type === 'pie' ? (
        <Box w="100%" style={{ display: 'flex', justifyContent: 'center', }}>
        <PieChart
          h={200}
          size={300}
          data={data.map((item, index) => ({
            name: String(item[groupBy]),
            value: Number(item.count),
            color: blueShades[index % blueShades.length],
          }))}
          strokeWidth={2}
          tooltipDataSource="segment"
          labelsPosition="outside"
          labelsType="value"
          withLabels
          withLabelsLine={false}
          withTooltip
        />
        </Box>
      ) : (
        <BarChart
          h={300}
          data={data}
          yAxisLabel="Amount"
          dataKey={groupBy}
          series={[{ name: 'count', color: 'blue' }]}
          withTooltip
        />
      )}
    </Box>
  );
};

export default StatsChart;
