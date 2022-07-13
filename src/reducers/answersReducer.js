export default (state=[], action) => {
   switch (action.type) {
      case 'SELECTED_ANSWERS':
         return action.payload;
      default: 
         return state
   }
}