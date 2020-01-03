export const addProduct = items => (
    {
      type: 'ADD_PRODUCT',
      payload: items
    }
  );


  export const deleteProduct = items => (
    {
      type: 'DELETE_PRODUCT',
      payload: items
    }
  );
