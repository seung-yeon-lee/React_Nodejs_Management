const initState = {
  posts: [
    { id: "1", title: "redux", body: "decription list 1" },
    { id: "2", title: "router", body: "decription list 2" },
    { id: "3", title: "database", body: "decription list 3" },
  ],
};

export const rootReducer = (state = initState, action) => {
  const { type, id } = action;
  switch (type) {
    case "DELETE_POST": {
      let newData = state.posts.filter((v) => {
        return v.id !== id;
      });
      return {
        ...state,
        posts: newData,
      };
    }
  }
  return state;
};
