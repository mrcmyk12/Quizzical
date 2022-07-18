export default (state=[1], action)=>{
   switch(action.type){
      case 'ROUND':
         return action.payload;
      default:
         return state;
   }
}