import service from "@/service";


export function login(data){
    return service({
        method:'POST',
        url: '/user/login',
        data
    })
}