import { Text, useTheme } from "@ui-kitten/components"
import React from "react"
import { StyleSheet, View } from "react-native"

interface Props {
  content: string
}

export const CounterSpinner:React.FC<Props> = ({content}) => {
  const theme = useTheme();

  return <View style={[styles.container, { borderColor: theme['color-info-400'] }]}>
    <Text style={styles.text} category='h1'>{content}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 20,
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
  },
  text: {
    fontSize: 64,
  }
})
