const handlers = {
  ADD_TODO: (state, action) => ({
    ...state,
    todos: [...state.todos, { id: Date.now().toString(), title: action.title }],
  }),
  REMOVE_TODO: (state, action) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.id),
  }),
  UPDATE_TODO: (state, action) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id == action.id) {
        todo.title = action.title;
      }
      return todo;
    }),
  }),
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
