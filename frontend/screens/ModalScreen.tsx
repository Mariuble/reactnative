import { StatusBar } from 'expo-status-bar'
import { Box, NativeBaseProvider } from 'native-base'
import * as React from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import Animes from '../graphql/Animes'

export default function ModalScreen() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Animes />
        <EditScreenInfo path='/screens/ModalScreen.tsx' />
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </NativeBaseProvider>
  )
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
