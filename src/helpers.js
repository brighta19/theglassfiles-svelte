function getPathFromItem(item, showDetails = false) {
    const media = item.media_type === "video" ? "videos" : "images";
    const hash = showDetails ? "#details" : "";
    return `/${media}/${item.id}${hash}`;
}

function getGeneralMediaType(item) {
    return item.media_type === "video" ? "video" : "image";
}

function getBrowseUrlFromTag(tag) {
    return `https://www.theglassfiles.com/browse/tags?q=${tag}`;
}

export { getPathFromItem, getGeneralMediaType, getBrowseUrlFromTag };
