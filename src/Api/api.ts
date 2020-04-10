import { ProfileType } from './../Types/types';
import  axios from "axios";

// - DAL-objects, obgects for low server level actions !!!
// export const getUsers = (currentPage, pageSize) => {
//     return axios.get(
//         `https://social-network.samuraijs.com/api/1.0/users?page=$
//{currentPage}&count=${ pageSize}`,
//         {withCredentials: true},//- can see "follow" - "unfollow" on page
//       ).then(response => response.data); //-PROMISE - return only DATA!!
// }//- becouse promise GET returns all response, we need only RESPONSE.DATA

const instance = axios.create({
  withCredentials: true, //- can see "follow" - "unfollow" on page
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,

  headers: {
    "API-KEY": "73ba89b2-a673-47b8-b695-9bef7378aa54"
    //"crossdomain": "true",
    // "Access-Control-Allow-Origin": "*"
  }
});

export const usersAPI = {
  // - pack for all methods to work with endPoints

  getUsers(currentPage:number, pageSize:number) {
    // - propertes of usersAPI!!!
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data); //-PROMISE - return only DATA!!
  }, //- becouse promise GET returns all response, we need only RESPONSE.DATA

  doUnfollow(userId:number) {
    return instance.delete(`follow/${userId}`).then(response => response.data);
  },

  doFollow(userId:number) {
    return instance
      .post(
        `follow/${userId}`,
        {} //- second object in POST!!!
      )
      .then(response => response.data);
  },

  getProfile(userId:number) {
    //- GET returns PROMIS, we subscribe to ше with THEN
    return profileAPI.getProfile(userId); //- redirecting
  }
};

export const profileAPI = {
  // - pack for all methods to work with endPoints

  getProfile(userId:number) {
    //- GET returns PROMIS, we subscribe to ше with THEN
    return instance
      .get(
        `profile/${userId}` // - and THEN returns other PROMIS that returns
      )
      .then(response => response.data); // - outside to US
  },
  getStatus(userId:number) {
    return instance
      .get(`profile/status/${userId}`)
      .then(response => response.data);
  },
  updateStatus(status:string) {
    // - json object
    return instance
      .put(`profile/status`, { status: status })
      .then(response => response.data);
  },
  savePhoto(photoFile:any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multypart/form-data"
        }
      })
      .then(response => response.data);
  },
  saveProfile(profile:ProfileType) {
    // - json object
    return instance.put(`profile`, profile).then(response => response.data);
  }
};

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    Captcha = 10
}

export enum ResultCodeEnumCaptcha {
    Captcha = 10
}

type AuthMeResultType = {
data: {
    id: number
    email: string
    login: string
}
resultCode:ResultCodeEnum 
messages: string []
}

type LoginResultType = {
    data: {
        userId: number
    }
    resultCode:ResultCodeEnum | ResultCodeEnumCaptcha
    messages: string []
    }

    type LogoutResultType = {
        resultCode:ResultCodeEnum 
        }

export const authAPI = {
  // - pack for all methods to work with endPoints
  authMe() {
    //- GET returns PROMIS, we subscribe to ше with THEN
    return instance
      .get<AuthMeResultType>(
        `auth/me` // - and THEN returns other PROMIS that returns
      )
      .then(response => response.data); // - outside to US
  },

  login(email:string, password:string, rememberMe:boolean = false, 
    captcha: string | null = null) {
    //- GET returns PROMIS, we subscribe to ше with THEN
    return instance
      .post<LoginResultType>(
        `auth/login`,
        { email, password, rememberMe, captcha } // - and THEN returns other PROMIS that returns
      )
      .then(response => response.data); // - outside to US
  },

  logout() {
    //- GET returns PROMIS, we subscribe to ше with THEN
    return instance
      .delete<LogoutResultType>(
        `auth/login` // - and THEN returns other PROMIS that returns
      )
      .then(response => response.data); // - outside to US
  }
};

export const securityAPI = { // - has thunk into authReduser
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
    .then(response => response.data); 
  }
};
