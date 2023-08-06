import { E7DataDomain } from "./const"

export function SkipToUrl(url: string) { 
    window.location.href = url
}
export function GenerateSetImageUrl(setTemp:string) { 
    return E7DataDomain + "/SetIcon/set_" + setTemp + ".png"
}