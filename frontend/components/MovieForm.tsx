import React, { useState } from 'react'
/*import {
  Box,
  Heading,
  ThemeProvider,
  theme,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  RadioGroup,
  Stack,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
} from '@chakra-ui/react'*/
import { Headline, RadioButton } from 'react-native-paper'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE } from '../graphql/GraphQLQueries'
import { Text } from './Themed'
import {
  Button,
  Modal,
  Picker,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { cacheSlot } from '@apollo/client/cache'

// Form for adding Movie
const MovieForm = () => {
  //States til de forskjellige input-feltene
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Movie')
  const [score, setScore] = useState(0)
  const [episodes, setEpisodes] = useState(0)
  const [description, setDescription] = useState('')

  const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE) //Query for adding movie to database

  const submitForm = () => {
    //Funksjon som sender mutasjonsspørring via GraphQL med argumentene fra inputsene lagret i statesa over.
    console.log(title, '|', type, '|', episodes, '|', score, '|', description)
    if (title != '' && score != 0 && episodes != 0 && description !== '') {
      addMovie({
        variables: {
          title: title,
          type: type,
          episodes: episodes,
          score: score / 10,
          description: description,
        },
      })
      setTitle('')
      setType('Movie')
      setScore(0)
      setEpisodes(0)
      setDescription('')
      return alert(
        'Movie added successfully. You can now search for it in the overview.'
      )
    } else {
      alert('Please fill in sufficient information in all fields.')
    }
    // Refetch queries to update cache: data from mutation
  }

  // if (loading) return 'Submitting...'
  // if (error) return `Submission error! ${error.message}`

  return (
    <>
      <SafeAreaView style={styles.view}>
        <ScrollView>
          {/* Makes screen scrollable */}
          <View>
            <Headline style={styles.mainTitle}>Add Anime</Headline>
          </View>
          <View>
            <Headline style={styles.titles}>Title</Headline>
            <TextInput
              value={title}
              style={styles.textinput}
              placeholder='Title'
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          {/* <View>
          <Headline>Type</Headline>
            <RadioButton.Group onValueChange={newType => setType(newType)} value={type}>
                <Text>Movie</Text>
                <RadioButton value='Movie'/>
                <Text>TV</Text>
                <RadioButton value='TV'/>
                <Text>OVA</Text>
                <RadioButton value='OVA'/>
                </RadioButton.Group>
        </View> */}
          {/* Old radiobutton group from different library */}

          <View>
            <Headline style={styles.titles}>Episodes</Headline>
            <TextInput
              style={styles.textinput}
              placeholder='0'
              keyboardType={'numeric'} //Limits mobile users to "number only" input
              value={episodes != 0 ? episodes.toString() : ''}
              onChangeText={(text) => {
                if (text.replace(/[^0-9]/g, '') === '') {
                  //Sjekker om inputen fra brukeren faktisk er et tall.
                  setEpisodes(0)
                } else {
                  setEpisodes(parseInt(text.replace(/[^0-9]/g, '')))
                }
              }}
              maxLength={10}
            />
          </View>
          <View>
            <Headline style={styles.titles}>Score (0-100)</Headline>
            <TextInput
              style={styles.textinput}
              placeholder='0'
              keyboardType={'numeric'}
              value={score.toString() != '0' ? score.toString() : ''}
              onChangeText={(text) => {
                if (text.replace(/[^0-9]/g, '') === '') {
                  //Sjekker om inputen fra brukeren faktisk er et tall.
                  setScore(0)
                } else {
                  parseInt(text.replace(/[^0-9]/g, '')) > 100 //Dersom brukeren skriver inn en høyere score enn 100, f.eks. 101, blir den defaulta til 100.
                    ? setScore(100)
                    : setScore(parseFloat(text.replace(/[^0-9]/g, '')))
                }
              }}
              maxLength={3}
            />
          </View>
          <View>
            <Headline style={styles.titles}>Description</Headline>
            <TextInput
              value={description}
              style={styles.textinput}
              placeholder='This is a default description'
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View>
            <Headline style={styles.titles}>Type of anime</Headline>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
              style={styles.picker}
            >
              {/* Dropdown menu alternative for mobile */}
              <Picker.Item label='Movie' value='Movie' />
              <Picker.Item label='TV' value='TV' />
              <Picker.Item label='OVA' value='OVA' />
            </Picker>
          </View>

          <View>
            <TouchableOpacity onPress={submitForm}>
              <View style={styles.btnView}>
                <Text style={styles.btnText}>Done</Text>
              </View>
            </TouchableOpacity>
            {/* <Button title='Done' onPress={submitForm}></Button> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default MovieForm

const styles = StyleSheet.create({
  view: {
    // marginLeft: '10%',
  },
  textinput: {
    marginBottom: '10%',
    height: 50,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginLeft: '10%',
  },
  titles: {
    marginLeft: '10%',
    fontWeight: 'bold',
  },
  picker: {
    width: '60%',
    textAlign: 'center',
    flex: 0.5,
    marginLeft: '20%',
  },
  mainTitle: {
    padding: 10,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnView: {
    borderRadius: 100,
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginLeft: '10%',
    marginBottom: '10%',
  },
  btnText: {
    fontSize: 20,
  },
})
