import useAxios, { RefetchOptions } from 'axios-hooks'
import { Message } from "@arco-design/web-react"
import { E7DataDomain } from '../const';

export interface LoginReq {
    username: string
    password: string
}

export function Login() {
    return useAxios({
        url: '/api/v1/e7/login',
        method: 'POST',
    }, {
        manual: true
    });
}
