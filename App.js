import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    const newTodo = { id: Date.now().toString(), title }
    setTodos(state => [...state, newTodo])
  }

  const removeTodo = (id) => {
    setTodos(state => state.filter(item => item.id !== id))
  }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = (
      <TodoScreen
        todo={selectedTodo}
        goBack={() => setTodoId(null)}
      />)
  }

  return (
    <View style={styles.app}>
      <Navbar title="Todo app" />
      <View style={styles.container}>
        {content}
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
