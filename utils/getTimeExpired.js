import Cookies from 'js-cookie';

export default function getTimeExpired(){
    return Cookies.get('expired')
}