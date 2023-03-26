import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../screen/screenContext";

const URL =
  "https://todo-native-base-default-rtdb.europe-west1.firebasedatabase.app";

export const TodoState = ({ children }) => {
  const initState = { todos: [], loading: false, error: null };
  const [state, dispatch] = useReducer(todoReducer, initState);
  const { changeScreen } = useContext(ScreenContext);

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const response = await fetch(`${URL}/todos.json`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data) {
        const todos = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        dispatch({ type: "FETCH_TODOS", todos: todos });
      }
    } catch (e) {
      showError("Что то пошло не так...");
    } finally {
      hideLoader();
    }
  };

  const addTodo = async (title) => {
    const response = await fetch(`${URL}/todos.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await response.json();

    dispatch({ type: "ADD_TODO", title, id: data.name });
  };

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
          onPress: async () => {
            changeScreen(null);
            await fetch(`${URL}/todos/${id}.json`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            });
            dispatch({ type: "REMOVE_TODO", id });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const updateTodo = async (id, title) => {
    clearError();
    try {
      await fetch(`${URL}/todos/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      dispatch({ type: "UPDATE_TODO", id, title });
    } catch (e) {
      showError("Что то пошло не так...");
    }
  };

  const showLoader = () => dispatch({ type: "SHOW_LOADER" });
  const hideLoader = () => dispatch({ type: "HIDE_LOADER" });
  const showError = (error) => dispatch({ type: "SHOW_ERROR", error });
  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,

        todos: state.todos,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
