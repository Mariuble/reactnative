import * as React from 'react'
import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import MovieForm from '../components/MovieForm'
import { Text, View } from '../components/Themed'

export default function TabTwoScreen() {
  return <MovieForm />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
