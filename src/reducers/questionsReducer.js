export default (state=[], action) => {
   switch (action.type) {
      case 'FETCH_QUESTIONS':
         return action.payload;
      default: 
         return state
   }
}