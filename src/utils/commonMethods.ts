
import Cookies from "universal-cookie"
import paths from "./paths"
import { autoInpuData } from "./commonInterfaces"

export const handleAuthNavigation = () => {
    const cookies = new Cookies({path:"/"})
    const cookie = cookies.get("auther")
    if(cookie === undefined) {
        window.location.href = paths.authPage
    }
}
export const randomeIdGenerater = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export const checkIsOptionTypeField = (value: string) => {
    if(value === 'checkbox' || value === 'radio' || value === 'select'){
        return true
    } else {
        return false
    }
}
export const inputFieldType = (value: string) => {
    if(value === 'email' || value === 'password' || value === 'text' || value === "number"){
        return true
    } else {
        return false
    }
}
export const validateUniqueKey = (array: any, key: any) => {
      const seen = new Set();
      for (const item of array) {
        if (seen.has(item[key])) {
          return false;
        }
        seen.add(item[key]);
      }
      return true;
    };
    
  export  const validateEmptyFields = (array: any) => {
  for (const item of array) {
    for (const key in item) {
      if (!item[key]) {
        
        return false;
      }
    }
  }
  return true;
};