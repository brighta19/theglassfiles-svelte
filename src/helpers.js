function getPathFromItem(item) {
    return item.media_type === "video" ? `/videos/${item.id}` : `/images/${item.id}`;
}

function getGeneralMediaType(item) {
    return item.media_type === "video" ? "video" : "image";
}

function getBrowseUrlFromTag(tag) {
    return `https://www.theglassfiles.com/browse/tags?q=${tag}`;
}

export { getPathFromItem, getGeneralMediaType, getBrowseUrlFromTag };
