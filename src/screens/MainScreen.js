import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Todo } from '../components/Todo';
import { AddTodo } from '../components/AddTodo';

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({})