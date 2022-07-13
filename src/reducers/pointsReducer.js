export default (state=[1], action) => {
   switch (action.type) {
      case 'POINTS':
         return action.payload
      default:
         return state
   }
}