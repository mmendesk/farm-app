const initialState = {
  show: false,
  message: 'Carregando',
};

export const loaderReduce = (state = initialState, action: any) => {
  switch (action.type) {
    case 'show_loader':
      return {
        ...state,
        show: action.show,
      };
    case 'loader_set_message':
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
