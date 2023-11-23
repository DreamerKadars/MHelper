import { HeroDetail } from "../utils/const"
import { E7DataDomain } from "./const"

export function SkipToUrl(url: string) { 
    window.location.href = url
}
export function GenerateSetImageUrl(setTemp:string) { 
    return E7DataDomain + "/SetIcon/set_" + setTemp + ".png"
}
export function GenerateArtifactImageUrl(artifactTemp: string) {
    return E7DataDomain + "/ArtifactImage/" + artifactTemp + "_ico.png"
}

export function GetHeroDetailFromListByHeroCode(heroCode:string,listInfo?: HeroDetail[]) { 
    return listInfo?.find(item => item.heroCode === heroCode)
}
