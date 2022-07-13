export default (state=[],action) => {
   switch (action.type) {
      case 'FETCH_DIFFICULTY':
         return action.payload;
      default:
         return state;
   }
}