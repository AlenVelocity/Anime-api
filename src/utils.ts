import { URLSearchParams } from 'url'
import { GOGO_URL } from './Constants'

export const getURL = (params: Record<string, string> = {}, path = '/'): string => {
    const url = new URLSearchParams(params)
    return GOGO_URL.concat(path, '?', url.toString())
}
