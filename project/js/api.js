let rootUrl = "http://47.103.203.188:9080";

//用户相关操作
let registerUrl = "/user/register";

let loginUrl = "/user/login";

let checkCodeUrl = "/checkCode";

let getUserUrl = "/user/getUser";

//对购物车操作
let joinProductUrl = "/operator/joinProduct";

let getJoinProductUrl = "/operator/getJoinProduct";

let removeJoinProductUrl = "/operator/removeJoinProduct";

//对订单操作
let buyProductUrl = "/operator/buyProduct";

let getBuyProductUrl = "/operator/getBuyProduct";

let removeBuyProductUrl = "/operator/removeBuyProduct";
let baseurl = 'http://localhost:8080/'
export function login(data) {
    return axios({
        method: 'post',
        url: baseurl +'api/user/name',
        data: data
    })
}

export function register(data) {
    return axios({
        method: 'post',
        url: baseurl +'api/user',
        data: data
    })
}

export function briefInfo(userId) {
    return axios({
        method: 'get',
        url: baseurl +'api/user/briefInfoById',
        params:{id:userId}
    })
}

export function changeIntroduction(id,introduction){
    return axios({
        method: 'get',
        url: baseurl +'api/user/changeIntroduction',
        params:{
            id:id,
            introduction:introduction
        }
    })
}
export function friendList(userId){
    return axios({
        method: 'get',
        url: baseurl +'api/friend/friendList',
        params:{
            userId:userId,
        }
    })
}
export function strangerList(userId){
    return axios({
        method: 'get',
        url: baseurl +'api/friend/strangerList',
        params:{
            userId:userId,
        }
    })
}
export function becomeFriend(userId,friendId){
    return axios({
        method: 'get',
        url: baseurl +'api/friend/become',
        params:{
            userId:userId,
            friendId:friendId
        }
    })
}
export function cancelFriend(userId,friendId){
    return axios({
        method: 'get',
        url: baseurl +'api/friend/cancel',
        params:{
            userId:userId,
            friendId:friendId
        }
    })
}
