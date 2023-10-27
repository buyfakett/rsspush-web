import service from "@/service";


export function refresh_push() {
    return service({
        method:'GET',
        url: '/push/refresh',
    })
}

export function get_push(params) {
    return service({
        method:'GET',
        url: '/push/view',
        params
    })
}
