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

export function HeroTemplateCreate() { 
    return useAxios({
        url: '/api/v1/protected/hero_template/create',
        method: 'POST',
    }, {
        manual: true
    });
}

export function HeroTemplateGet(auth?: boolean) {
    let url = '/api/v1/protected/hero_template/get'
    if (auth === false) { 
        url = '/api/v1/e7/hero_template/get'
    }
    return useAxios({
        url: url,
        method: 'GET',
    }, {
        manual: true
    });
}

export function HeroTemplateDelete() {
    return useAxios({
        url: '/api/v1/protected/hero_template/delete',
        method: 'DELETE',
    }, {
        manual: true
    });
}

export function HeroTemplateList(auth?: boolean) {
    let url = '/api/v1/protected/hero_template/list'
    if (auth === false) {
        url = '/api/v1/e7/hero_template/list'
    }
    return useAxios({
        url: url,
        method: 'GET',
    }, {
        manual: true
    });
}

export function HeroTemplateUpdate() {
    return useAxios({
        url: '/api/v1/protected/hero_template/update',
        method: 'PUT',
    }, {
        manual: true
    });
}