import jwtDecode from 'jwt-decode';
export function decodeUserToken(token) {
    var ret = jwtDecode(token);
    var user = {
        id: ret.id,
        name: ret.name,
        guest: ret.guest,
        token: token,
    };
    return user;
}
export function decodeGuestToken(token) {
    var ret = jwtDecode(token);
    var guest = {
        id: 0,
        guest: ret.guest,
        token: token,
    };
    return guest;
}
//# sourceMappingURL=user.js.map