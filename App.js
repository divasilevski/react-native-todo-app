import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';
import { Todo } from './src/Todo';


export default function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    const newTodo = { id: Date.now().toString(), title }
    setTodos(state => [...state, newTodo])
  }

  const removeTodo = (id) => {
    setTodos(state => state.filter(item => item.id !== id))
  }

  return (
    <View style={styles.app}>
      <Navbar title="Todo app" />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Todo todo={item} onRemove={removeTodo} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
