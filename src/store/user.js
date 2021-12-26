
import {userService} from "../services/user-service";
export default {
    state:{
        currUser: userService.getLoggedinUser(),
    },
    getters: {
        currUser(state){
            return state.currUser 
        },
    },
    mutations:{

    },
    actions:{
        async signUp({state,commit},{user}){
            try {
               const currUser = await userService.signup(user)
               state.currUser = currUser
               return currUser
            } catch(err){
                console.log('error while signing up');
                throw err
            }
        },
        async login({state},{user}){
            try{
               const currUser = await userService.login(user)
               state.currUser = currUser
               return currUser
            } catch(err){
                console.log('error while signing in');
                throw err
            }
        },
        async addUserBoard({state},{boardId}){
            try{
                if(boardId)state.currUser.boardsIds.push(boardId);
                if(boardId)await userService.update(state.currUser)
            }catch(err){
                console.log('error while adding board');
                throw err
            }
        },
        async logOut({state}){
            await userService.logout()
            state.currUser = userService.getLoggedinUser()
        },
         tryDemo({}){
             userService.tryDemo()
        }

    },
    components:{
        userService
    }
}