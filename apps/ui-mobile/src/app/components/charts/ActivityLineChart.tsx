import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { StyleSheet, Text as ReactText, View } from 'react-native';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import { Line, G, Rect, Text } from 'react-native-svg';
import { ChartDataType } from '@fitly/shared/meta';
import { DateTime, Interval } from 'luxon';

interface ActivityLineChartProps {
  data: ChartDataType[];
  lineColor?: string;
  interval: Interval;
}

const ActivityLineChart: React.FC<ActivityLineChartProps> = ({
  data,
  lineColor,
  interval,
}) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(
    null
  );
  const [chartWidth, setChartWidth] = useState<number>(100);
  const color = lineColor || 'rgb(89, 139, 255)';

  const Tooltip = ({ data, x, y, ...props }: any) => {
    const stepSize = chartWidth / data.length;
    const rectWidth = 80;
    const rectHeight = 25;
    return data.map((item: ChartDataType, index: number) => (
      <React.Fragment key={index}>
        <Rect
          height={'100%'}
          width={stepSize}
          x={x(item.date) - stepSize / 2}
          y={0}
          onPress={() => setSelectedMarkerIndex(index)}
          onLongPress={() => setSelectedMarkerIndex(null)}
        />
        {index === selectedMarkerIndex && (
          <>
            <Line
              x1={x(item.date)}
              y1={rectHeight / 2}
              x2={x(item.date)}
              y2={900}
              stroke={'gray'}
              strokeOpacity={0.5}
              strokeWidth={2}
              strokeDasharray={[5, 5]}
            />
            <G
              x={Math.max(
                Math.min(
                  x(item.date) - rectWidth / 2,
                  x(data[data.length - 1].date) - rectWidth
                ),
                0
              )}
            >
              <Rect
                fill={color}
                width={rectWidth}
                height={rectHeight}
                rx={rectHeight / 2}
              />
              {/* @ts-ignore */}
              <Text
                x={rectWidth / 2}
                fill="white"
                fontSize={15}
                textAnchor="middle"
                y={rectHeight - 7}
              >
                {item.value * windowCoefficient + ' r/min'}
              </Text>
            </G>
          </>
        )}
      </React.Fragment>
    ));
  };

  function formatXLabel(value: Date, index: number) {
    const date = DateTime.fromJSDate(value);
    return date.diff(interval?.start).toFormat('mm:ss');
  }

  const xTicks = 6;
  const verticalInset = { top: 30, bottom: 10, left: 1, right: 1 };
  const windowCoefficient = 60 / 10;
  const yMax = Math.max(...data.map((v) => v.value)) + 1;
  const numTicks = Math.min(yMax + 1, xTicks);
  const yAxisData = Array(yMax + 1)
    .fill(0)
    .map((_, i) => i * windowCoefficient);
  const axesSvg = {
    fill: 'black',
    fontSize: 8,
  };

  return (
    <View style={{ marginVertical: 16 }}>
      <ReactText
        style={{
          marginTop: -16,
          marginBottom: -16 - 8,
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        exercise rate [r/min]
      </ReactText>
      <View style={{ flexDirection: 'row', height: 220, paddingHorizontal: 4 }}>
        <YAxis
          data={yAxisData}
          svg={axesSvg}
          contentInset={verticalInset}
          style={{ marginBottom: 20 }}
          numberOfTicks={numTicks}
        />
        <View
          style={{ height: 220, flex: 1, marginLeft: 8 }}
          onLayout={(event) => setChartWidth(event.nativeEvent.layout.width)}
        >
          <LineChart
            style={{ flex: 1 }}
            data={data}
            yAccessor={({ item }) => item.value * 6}
            xAccessor={({ item }) => item.date as any as number}
            xScale={scale.scaleTime}
            contentInset={verticalInset}
            svg={{ stroke: color, strokeWidth: '5px' }}
            numberOfTicks={numTicks}
            yMax={yMax * windowCoefficient}
            yMin={0}
            curve={shape.curveMonotoneX}
          >
            <Grid />
            <Tooltip />
          </LineChart>
          <XAxis
            data={data}
            svg={axesSvg}
            xAccessor={({ item }) => item.date}
            scale={scale.scaleTime}
            numberOfTicks={6}
            style={{ marginHorizontal: -16, height: 20 }}
            contentInset={{ left: 16, right: 16 }}
            formatLabel={formatXLabel}
          />
        </View>
      </View>
    </View>
  );
};

export default ActivityLineChart;
// yolo inline styles 🦞
