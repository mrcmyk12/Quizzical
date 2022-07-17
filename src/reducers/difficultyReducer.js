export default (state=null, action) => {
   switch (action.type) {
      case "SELECTED_DIFFICULTY":
         return action.payload;
      default: 
         return state
   }
}
