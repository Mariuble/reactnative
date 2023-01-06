import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Text, StyleSheet } from 'react-native'
import {
  ANIMES_SORTED_TITLE,
  GET_ANIME_COUNT,
  TEST_QUERY,
} from './GraphQLQueries'
import {
  Box,
  Button,
  Input,
  InputGroup,
  Row,
  ScrollView,
  Skeleton,
  Spinner,
  Stack,
} from 'native-base'
import Movie from '../components/Movie'
import { View } from '../components/Themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { flexbox } from 'native-base/lib/typescript/theme/styled-system'
//import Movie from '../components/Episode/Movie'

const Animes = () => {
  //States for keeping track of user input and query arguments
  const [baseTitle, setBaseTitle] = useState('')
  const [baseFirst, setBaseFirst] = useState(10)
  const [baseOffset, setBaseOffset] = useState(0)
  const [searchWord, setSearchWord] = useState('Search any title')
  const [pageNo, setPageNo] = useState(1)
  const [sortOn, setSort] = useState('Title')
  let textInput: any = React.createRef<HTMLInputElement>()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: 'Title', value: 'Title' },
    { label: 'Score', value: 'Score' },
  ])
  //Queries
  const { loading, error, data, refetch } = useQuery(ANIMES_SORTED_TITLE, {
    variables: {
      title: baseTitle,
      first: baseFirst,
      offset: baseOffset,
      sort: sortOn,
    },
  })
  const {
    loading: loading3,
    error: error3,
    data: data3,
    refetch: refetch3,
  } = useQuery(TEST_QUERY, {
    variables: { title: baseTitle, first: baseFirst, offset: baseOffset },
  })
  const {
    loading: loading2,
    error: error2,
    data: data2,
    refetch: refetch2,
  } = useQuery(GET_ANIME_COUNT, {
    variables: { title: baseTitle },
  })

  //Method for handling searches
  const handleSearch = () => {
    setBaseTitle(searchWord)
    setBaseOffset(0)
    setPageNo(1)
    setSearchWord('')
  }

  const handleUpdate = (e: any) => {
    setSearchWord(e)
  }

  //Old method to check for enter key press
  const handleSearchEnter = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  //Go to previous page if there is one
  const handlePrevPage = () => {
    if (baseOffset >= baseFirst) {
      setBaseOffset(baseOffset - 10)
      setPageNo(pageNo - 1)
    }
  }

  //go to next page if there is one
  const handleNextPage = () => {
    if (data.sortMoviesByTitle.length == baseFirst) {
      setBaseOffset(baseOffset + 10)
      setPageNo(pageNo + 1)
    }
  }

  const logData = () => {
    console.log(data)
  }

  //Debugging
  const handleNextPage2 = () => {
    console.log('Data length: ' + data.sortMoviesByTitle.length)
    console.log(data.sortMoviesByTitle.length > baseOffset)
    console.log('Page number: ' + pageNo)
    console.log('Results ' + data2.countMoviesByTitle)
  }

  //Handles next page button
  function NextBtn() {
    console.log('result: ' + (data2.countMoviesByTitle % baseFirst > 0))
    if (data2.countMoviesByTitle - pageNo * baseFirst > 0) {
      return (
        <Button colorScheme='blue' onPress={handleNextPage}>
          Next page
        </Button>
      )
    } else {
      return (
        <Button colorScheme='blue' disabled>
          Next page
        </Button>
      )
    }
  }

  //Handles previous page button
  function PrevBtn() {
    if (pageNo > 1) {
      return (
        <Button colorScheme='blue' onPress={handlePrevPage}>
          Prev page
        </Button>
      )
    } else {
      return (
        <Button colorScheme='blue' disabled onPressIn={logData}>
          Prev page
        </Button>
      )
    }
  }

  // // const handleFilter = (e: any) => {
  // //   setSort(e)
  // //   filterStore.dispatch(setFilter(e))
  // //   console.log('e: ' + e + ' Type of: ' + typeof e)
  // // }

  //Placeholder if app is loading
  if (loading || loading2 || loading3)
    return (
      <Box textAlign='center'>
        <Spinner color='cyan.500' />
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>
      </Box>
    )
  console.log(data3)
  console.log('Offset: ' + baseOffset)
  console.log(typeof data)
  console.log(data)
  return (
    <>
      {/* Search field */}
      <InputGroup marginTop='10%' marginBottom='10%' height='60%'>
        <Input
          width='80%'
          m='2'
          placeholder={searchWord}
          variant='outline'
          aria-label='Searchfield'
          ref={textInput}
          onKeyPress={handleSearchEnter}
          onChangeText={(e) => handleUpdate(e)}
        />
        <Button m='2' onPress={handleSearch}>
          Search
        </Button>
      </InputGroup>
      {/* Sorting method picker */}
      <View style={styles.sort}>
        <DropDownPicker
          open={open}
          value={sortOn}
          items={items}
          setOpen={setOpen}
          setValue={setSort}
          setItems={setItems}
          placeholder={sortOn}
          dropDownContainerStyle={{
            width: '100%',
          }}
        ></DropDownPicker>
      </View>

      <ScrollView>
        <Box textAlign='center' style={styles.buttons}>
          <PrevBtn />
          <NextBtn />
        </Box>
        {data.sortMoviesByTitle.map((movie: any) => Movie(movie))}
        <Box textAlign='center' style={styles.buttons}>
          <PrevBtn />
          <NextBtn />
        </Box>
      </ScrollView>
    </>
  )
}

export default Animes

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  butonspace: {
    padding: 20,
  },
  sort: {
    width: '80%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 100,
  },
})
