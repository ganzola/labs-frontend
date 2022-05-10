const tokenKey = 'token-ingesoft';
const role = 'user-rol';

export function getAuthenticationToken(){
    return localStorage.getItem( tokenKey );
}

export function setAuthenticationToken( token = '' ){
    return localStorage.setItem( tokenKey, token );
}

export function getRole(){
    return localStorage.getItem( role );
}

export function setRole( rol = '' ){
    return localStorage.setItem( role, rol );
}
