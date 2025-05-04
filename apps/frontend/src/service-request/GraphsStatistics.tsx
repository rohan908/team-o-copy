import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from '@mantine/charts';
import { Select, SegmentedControl, Stack, Loader, Center } from '@mantine/core';

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
    <Stack>
      <Select
        label="Group data by"
        value={groupBy}
        onChange={(value) => setGroupBy(value as typeof groupBy)}
        data={['priority', 'hospital', 'employeeName']}
      />

      <SegmentedControl
        fullWidth
        value={type}
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
          data={data.map((item) => ({
            name: String(item[groupBy]),
            value: Number(item.count),
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
    </Stack>
  );
};

export default StatsChart;
