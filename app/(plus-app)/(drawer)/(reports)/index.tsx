import { generateMonthlyData } from "@/constants/DummyData";
import { Color } from "@/constants/TWPalette";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import GeneralContentView from "@/components/GeneralContentView";
import { useFocusEffect } from "expo-router";
import { getCountAllOpinions, Opinion } from "@/services/dataService";
import TopReportNumbers from "@/components/TopReportNumbers";

interface BarData {
  value: number;
  label?: string;
  frontColor?: string;
  [key: string]: any;
}

interface ItopNumbers {
  total: number;
  perYear: number;
  perMonth: number;
}

export default function MinimalChart() {
  const [topNumbers, setTopNumbers] = useState<ItopNumbers>({ total: 0, perYear: 0, perMonth: 0 })
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // const [opinions, setOpinions] = useState<Opinion[] | null>(null)

  const loadData = useCallback(() => {
    const getOpinions = async () => {
      const totalOpinions = await getCountAllOpinions()
      totalOpinions && setTopNumbers({ ...topNumbers, total: totalOpinions.count })
    }
    getOpinions()
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const getMonthName = (month: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  };

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedBarIndex(null);
  };

  const monthlyData = useMemo(
    () => generateMonthlyData(currentYear, currentMonth + 1),
    [currentYear, currentMonth]
  );

  const getChartData = useCallback(() => {
    return monthlyData.map((item, index) => ({
      ...item,
      frontColor:
        selectedBarIndex === index
          ? '#ea580c'
          : '#f97316',
      gradientColor:
        selectedBarIndex === index ? '#fb923c' : '#fdba74',
      topLabelComponent: () =>
        selectedBarIndex === index ? (
          <Text
            style={{
              color: '#c2410c',
              fontSize: 10,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            {item.value}
          </Text>
        ) : null,
    }));
  }, [monthlyData, selectedBarIndex]);

  return (
    <GeneralContentView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <TopReportNumbers
          total={topNumbers.total}
          perYear={topNumbers.perYear}
          perMonth={topNumbers.perMonth}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 16,
          }}
        >
          <Pressable
            onPress={() => navigateMonth(-1)}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <Ionicons
              name="chevron-back-outline"
              size={20}
              color={Color.gray[500]}
            />
          </Pressable>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: Color.gray[900],
            }}
          >
            {getMonthName(currentMonth)} {currentYear}
          </Text>

          <Pressable
            onPress={() => navigateMonth(1)}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={Color.gray[500]}
            />
          </Pressable>
        </View>

        {/* Chart Container */}
        <View
          style={{
            marginBottom: 32,
            overflow: "hidden",
          }}
        >
          <BarChart
            noOfSections={4}
            barBorderRadius={4}
            data={getChartData()}
            yAxisThickness={0}
            xAxisThickness={0}
            // hideYAxisText
            xAxisLabelTextStyle={{
              color: Color.gray[400],
              fontSize: 12,
              fontWeight: "500",
            }}
            yAxisTextStyle={{
              color: Color.gray[400],
              fontSize: 12,
              fontWeight: "500",
            }}
            showXAxisIndices={false}
            isAnimated
            animationDuration={300}
            onPress={(_item: BarData, index: number) => {
              setSelectedBarIndex(selectedBarIndex === index ? null : index);
            }}
            showGradient
            dashGap={10}
          />
        </View>
      </ScrollView>
    </GeneralContentView>
  );
}