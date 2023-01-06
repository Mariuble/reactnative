import { Tag, View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '../components/Themed'

const Movie = (movie: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.Title}</Text>
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{'score: ' + movie.Score.toFixed(1)}</Text>
        <Text style={styles.tag}>{'Type: ' + movie.Type}</Text>
      </View>
      <Text style={styles.description}>{movie.Description}</Text>
    </View>
  )
}

export default Movie

const styles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#aef',
  },
  description: {
    marginBottom: 10,
    fontSize: 20,
  }
})
