export default (state=null, action) =>{
   switch (action.type) {
      case 'SESSION_KEY':
         return action.payload
      default:
         return state
   }
}