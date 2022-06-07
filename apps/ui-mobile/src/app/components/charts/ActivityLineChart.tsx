import React, { useState } from 'react';
import { LineChart, XAxis } from 'react-native-svg-charts';
import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as shape from 'd3-shape';
import { Circle } from 'react-native-svg';
import { ChartDataType } from '@fitly/shared/meta';

interface ActivityLineChartProps {
  data: ChartDataType[];
  lineColor?: string;
  subtitle?: string;
  selectedValueSubText?: string;
}

const ActivityLineChart: React.FC<ActivityLineChartProps> = ({
  data,
  lineColor,
  selectedValueSubText,
  subtitle,
}) => {
  const backgroundColor = 'rgba(255,255,255,0.5)';
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number>(4);
  const color = lineColor || 'rgb(89, 139, 255)';

  const ChartPoints = ({ data, x, y, ...props }: any) => {
    return data.map((item: ChartDataType, index: number) => {
      const isSelected = selectedMarkerIndex === index;
      const _r = 16;
      const _largerR = _r * 4.2;

      return (
        <React.Fragment key={index}>
          <Circle
            cx={x(index)}
            cy={y(item.value)}
            r={_largerR}
            onPress={() => setSelectedMarkerIndex(index)}
          />
          <Circle
            cx={x(index)}
            cy={y(item.value)}
            r={isSelected ? _r : _r / 2}
            fill={color}
          />
          {isSelected && (
            <Circle
              fill="rgb(255, 255, 255)"
              cx={x(index)}
              cy={y(item.value)}
              r={_r / 2}
            />
          )}
        </React.Fragment>
      );
    });
  };

  const formatXLabelFromData = (_: number, index: number) => {
    const { date } = data[index];
    const dateString = new Date(date).toLocaleString('en', {
      weekday: 'short',
    });
    return dateString;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.selectedDayValue}>
        {data[selectedMarkerIndex].value}
      </Text>
      <Text style={styles.valueType}>{selectedValueSubText}</Text>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        locations={[0, 0.4, 0.5, 0.6, 1]}
        colors={[
          backgroundColor,
          'transparent',
          'transparent',
          'transparent',
          backgroundColor,
        ]}
        style={styles.linearGradient}
        pointerEvents="box-none"
      >
        <LineChart
          data={data}
          svg={{
            stroke: color,
            strokeWidth: '5px',
          }}
          curve={shape.curveBumpX}
          contentInset={{ top: 20, bottom: 20 }}
          style={styles.lineChart}
          ymin={-1}
          yAccessor={(item: { index: number; item: ChartDataType }) =>
            item.item.value
          }
          animate
          animateDelay={300}
        >
          {/*//@ts-ignore*/}
          <ChartPoints color="black" />
        </LineChart>
      </LinearGradient>
      <XAxis
        style={styles.xAxis}
        data={data}
        formatLabel={formatXLabelFromData}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 10, fill: 'black' }}
      />
      <Text style={styles.chartTitle}>{subtitle}</Text>
    </View>
  );
};

export default ActivityLineChart;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  lineChart: {
    height: 280,
    zIndex: 0,
    elevation: -1,
  },
  linearGradient: {
    zIndex: 1,
    elevation: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  selectedDayValue: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
  },
  valueType: {
    fontSize: 18,

    textAlign: 'center',
  },
  xAxis: {
    marginHorizontal: -10,
    fontSize: 20,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
