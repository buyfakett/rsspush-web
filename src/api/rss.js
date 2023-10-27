import service from "@/service";


export function rss_list(params) {
    return service({
        method:'GET',
        url: '/rss/list',
        params
    })
}