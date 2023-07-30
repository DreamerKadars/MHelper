// import React from 'react';
import useAxios, { RefetchOptions } from 'axios-hooks'
import { E7DataDomain } from '../const';

export function LoadHeroJSON() { 
    return useAxios({
        url: E7DataDomain+'/hero_data.json',
        method: 'GET'
    });
}