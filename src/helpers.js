function getPathFromItem(item) {
    return item.media_type === "video" ? `/videos/${item.id}` : `/images/${item.id}`;
}

function getGeneralMediaType(item) {
    return item.media_type === "video" ? "video" : "image";
}

export { getPathFromItem, getGeneralMediaType };
