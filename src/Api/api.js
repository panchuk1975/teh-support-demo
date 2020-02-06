import * as axios from "axios";

// - DAL-objects, obgects for low server level actions !!!
// export const getUsers = (currentPage, pageSize) => {
//     return axios.get(
//         `https://social-network.samuraijs.com/api/1.0/users?page=$
//{currentPage}&count=${ pageSize}`,
//         {withCredentials: true},//- can see "follow" - "unfollow" on page
//       ).then(response => response.data); //-PROMISE - return only DATA!!
// }//- becouse promise GET returns all response, we need only RESPONSE.DATA

const instance = axios.create(
    { 
        withCredentials: true,//- can see "follow" - "unfollow" on page
        baseURL:  `https://social-network.samuraijs.com/api/1.0/`,

        headers:{ 
            "API-KEY":"73ba89b2-a673-47b8-b695-9bef7378aa54",
            //"crossdomain": "true",
           // "Access-Control-Allow-Origin": "*"
    }}
)

export const usersAPI = {// - pack for all methods to work with endPoints
    
    getUsers(currentPage, pageSize){// - propertes of usersAPI!!!
        return instance.get(
            `users?page=${currentPage}&count=${ pageSize}`,
          ).then(response => response.data); //-PROMISE - return only DATA!!
    }, //- becouse promise GET returns all response, we need only RESPONSE.DATA

    doUnfollow(userId){
        return instance.delete(
            `follow/${userId}`,
          ).then(response => response.data);
    },

    doFollow(userId){
        return instance.post(
            `follow/${userId}`,{}//- second object in POST!!!
          ).then(response => response.data);
    },

    getProfile(userId){//- GET returns PROMIS, we subscribe to ше with THEN
        return profileAPI.getProfile(userId); //- redirecting
}
}

export const profileAPI = {// - pack for all methods to work with endPoints
    
    getProfile(userId){//- GET returns PROMIS, we subscribe to ше with THEN
        return instance.get( 
            `profile/${userId}`,// - and THEN returns other PROMIS that returns
        ).then(response => response.data); // - outside to US
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
        .then(response => response.data); 
    },
    updateStatus(status){// - json object
        return instance.put(`profile/status`, {status: status})
        .then(response => response.data); ;
    }
}

export const authAPI = {// - pack for all methods to work with endPoints

    authMe(){//- GET returns PROMIS, we subscribe to ше with THEN
        return instance.get( 
            `auth/me`,// - and THEN returns other PROMIS that returns
        ).then(response => response.data); // - outside to US
    },

    login(email, password, rememberMe = false){//- GET returns PROMIS, we subscribe to ше with THEN
        return instance.post( 
            `auth/login`, {email, password, rememberMe}// - and THEN returns other PROMIS that returns
        ).then(response => response.data); // - outside to US
    },

    logout(){//- GET returns PROMIS, we subscribe to ше with THEN
        return instance.delete( 
            `auth/login`,// - and THEN returns other PROMIS that returns
        ).then(response => response.data); // - outside to US
    },
}


    