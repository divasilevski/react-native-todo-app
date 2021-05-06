import React from 'react'
import { StyleSheet, TextInput, View, Button } from 'react-native'

export const AddTodo = ({ onSubmit }) => {
  const pressHandler = () => {
    onSubmit('Test todo')
  }

  return (
    <View style={styles.block}>
      <TextInput style={styles.input} />
      <Button title="Добавить" onPress={pressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
    marginRight: 15
  },
})