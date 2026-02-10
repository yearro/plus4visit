import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import GeneralContentView from "@/components/GeneralContentView";
import { useFocusEffect } from "expo-router";
import { getCountAllOpinions, getOpinionsByMonth, getOpinionsByYear, Opinion } from "@/services/dataService";
import TopReportNumbers from "@/components/TopReportNumbers";
import { satisfactionLevel } from "@/helpers/imagestList";

interface ItopNumbers {
  total: number | undefined;
  perYear: number | undefined;
  perMonth: number | undefined;
}

export default function MinimalChart() {
  const [chartKey, setChartKey] = useState(Date.now());
  const [topNumbers, setTopNumbers] = useState<ItopNumbers>({ total: 0, perYear: 0, perMonth: 0 })
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [opinions, setOpinions] = useState<Opinion[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      setCurrentMonth(new Date().getMonth())
      setCurrentYear(new Date().getFullYear())
      return () => {
        setCurrentMonth(1)
        setCurrentYear(1)
      }
    }, [])
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
  };

  useEffect(() => {
    const getData = async() => {
      const total = await getCountAllOpinions()
      const resultPerYear = await getOpinionsByYear(currentYear)
      const result = await getOpinionsByMonth(currentYear, currentMonth)
      setOpinions(result)
      setTopNumbers({
          total: total?.count,
          perYear: resultPerYear?.count,
          perMonth: result?.length
        })
    }
    getData()
  }, [currentYear, currentMonth])

  const transformedData = useMemo(() => {
    if (!opinions) return [];
    setChartKey(Date.now());
    return satisfactionLevel.map((item, index) => ({
        value: opinions?.filter(option => option.satisfaction === item.id).length,
        frontColor: '#f97316',
        gradientColor: '#fdba74',
        topLabelComponent: () =>
         (
          <Text
            style={{
              color: '#c2410c',
              fontSize: 10,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            {opinions?.filter(option => option.satisfaction === item.id).length}
          </Text>
        ),
        labelComponent: () =>
          (<Image
            source={item.src}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />)
      }))
  }, [opinions]);


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
              color={'#6b7280'}
            />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: '#111827',
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
              color={'#6b7280'}
            />
          </Pressable>
        </View>
        <View
          style={{
            marginBottom: 32,
            overflow: "hidden",
          }}
        >
          <BarChart
            key={chartKey}
            noOfSections={4}
            barBorderRadius={4}
            data={transformedData}
            yAxisThickness={0}
            xAxisThickness={0}
            // hideYAxisText
            xAxisLabelTextStyle={{
              color: '#9ca3af',
              fontSize: 12,
              fontWeight: "500",
            }}
            yAxisTextStyle={{
              color: '#9ca3af',
              fontSize: 12,
              fontWeight: "500",
            }}
            showXAxisIndices={false}
            isAnimated
            //isThreeD
            animationDuration={300}
            showGradient
            dashGap={10}
            xAxisTextNumberOfLines={2}
          />
        </View>
      </ScrollView>
    </GeneralContentView>
  );
}