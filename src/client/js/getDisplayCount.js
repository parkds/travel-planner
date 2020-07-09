function getDisplayCount(data,maxLength) {
    if (data.length<maxLength) {
        return data.length
    }
    else
        return maxLength

}
export {getDisplayCount}