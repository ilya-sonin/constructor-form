export function getAssets (asset) {
    const BASE_URL = import.meta.env.BASE_URL || '/'

    if (asset.startsWith('/')) {
        asset = asset.substring(1)
    }

    return new URL(BASE_URL + asset, import.meta.url).href
}