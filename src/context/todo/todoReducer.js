const handlers = {
  ADD_TODO: (state, { id, title }) => ({
    ...state,
    todos: [...state.todos, { id, title }],
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

  FETCH_TODOS: (state, { todos }) => ({ ...state, todos }),
  SHOW_LOADER: (state) => ({ ...state, loading: true }),
  HIDE_LOADER: (state) => ({ ...state, loading: false }),
  SHOW_ERROR: (state, { error }) => ({ ...state, error }),
  CLEAR_ERROR: (state) => ({ ...state, error: null }),

  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
