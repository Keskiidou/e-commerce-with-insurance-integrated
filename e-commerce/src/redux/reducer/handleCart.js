
const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      const exist = state.find((x) => x._id === product._id); 
      if (exist) {
        return [...state, { ...product, qty: 0 }];
      } else {
        return [...state, { ...product, qty: 1 }];
      }

    case "DELITEM":
      const exist2 = state.find((x) => x._id === product._id);
      if (exist2.qty === 1) {
        return state.filter((x) => x._id !== exist2._id);
      } else {
        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty - 1 } : x
        );
      }

    default:
      return state;
  }
};

export default handleCart;

