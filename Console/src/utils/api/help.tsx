// import React from 'react';
import useAxios, { RefetchOptions } from 'axios-hooks'
import { Message } from "@arco-design/web-react"
import { E7DataDomain } from '../const';

export function LoadHeroJSON() {
    return useAxios({
        url: E7DataDomain + '/hero_data.json',
        method: 'GET'
    });
}

export function LoadHeroFribbelsJSON() {
    return useAxios({
        url: E7DataDomain + '/hero_data_fribbels.json',
        method: 'GET'
    });
}

export function LoadArtifactJSON() {
    return useAxios({
        url: E7DataDomain + '/artifact_data.json',
        method: 'GET'
    });
}

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

// HeroCode string
export function GetHeroDetail() {
    return useAxios({
        url: '/api/v1/e7/hero_static_data',
        method: 'GET',
    }, {
        manual: true
    });
}

export function HandlerAxiosErrPrefix(prefix: string,error: any ) {
    if (error.response?.data?.Message) {
        Message.error(prefix + error.response.data.Message)
    } else {
        Message.error(prefix + error.message)
    }
}

export function HandlerAxiosSuccessPrefix(prefix: string, data: any) {    
    Message.success(prefix + "成功")
}