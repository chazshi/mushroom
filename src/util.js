export function getRedirectPath({type, avatar}) {
    // 跟据用户的type和头像avatar信息，返回跳转的地址
    //type： /boss   /hunter
    //avater：   //bossinfo  /hunterinfo
    let url = (type==='boss')? '/boss':'/hunter'
    if(!avatar) {
        url += 'info'
    }
    return url

}