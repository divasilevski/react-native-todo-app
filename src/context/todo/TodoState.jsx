import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  const initState = { todos: [{ id: "1", title: "foo" }] };
  const [state, dispatch] = useReducer(todoReducer, initState);
  const { changeScreen } = useContext(ScreenContext);

  const addTodo = (title) => dispatch({ type: "ADD_TODO", title });
  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}?"`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            changeScreen(null);
            dispatch({ type: "REMOVE_TODO", id });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const updateTodo = (id, title) =>
    dispatch({ type: "UPDATE_TODO", id, title });

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        removeTodo,
        updateTodo,
        todos: state.todos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
