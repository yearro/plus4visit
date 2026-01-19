import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface iProps {
  total: number | undefined;
  perYear: number | undefined;
  perMonth: number | undefined;
}

const ReportCard = (label = '', value = 0) => (
  <View style={styles.card }>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{ value }</Text>
  </View>
)

const TopReportNumbers = ({ total = 0, perYear = 0, perMonth = 0 }:iProps) => {
  return (
    <View style={styles.container}>
      { ReportCard('Total', total) }
      { ReportCard('Year', perYear) }
      { ReportCard('Month', perMonth) }
    </View>
  )
}

export default TopReportNumbers

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
  },
  label: {
    fontSize: 14,
    color: '#4b5563',
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: '#111827',
    marginTop: 4,
  }
})