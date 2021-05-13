const handlers = {
  CHANGE_SCREEN: (_, action) => action.payload,
  DEFAULT: (state) => state,
};

export const screenReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
