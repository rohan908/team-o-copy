import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from '@mantine/charts';
import { SegmentedControl, Stack, Loader, Center, Title, Box } from '@mantine/core';
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
        Group Data by:
      </Title>
      <FilterGraph value={groupBy} onChange={setGroupBy} />
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
        <PieChart
          h={300}
          data={data.map((item) => ({
            name: String(item[groupBy]),
            value: Number(item.count),
            color: 'blue',
          }))}
          withTooltip
        />
      ) : (
        <BarChart
          h={300}
          data={data}
          dataKey={groupBy}
          series={[{ name: 'count', color: 'blue' }]}
          withTooltip
        />
      )}
    </Box>
  );
};

export default StatsChart;
