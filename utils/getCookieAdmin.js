import Cookies from 'js-cookie';

export default function getTokenAdmin(){
    return Cookies.get('token')
}