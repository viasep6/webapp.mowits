

export function getDisplayItemFromResult (storageItem, detailItem) {
    const addedToList = new Date(storageItem.added)
    return {
        id: detailItem.id,
        title: detailItem.original_title,
        year: new Date(detailItem.release_date).getFullYear().toString(),
        poster: detailItem.poster_path,
        tagline: detailItem.tagline,
        score: `${detailItem.vote_average * 10}%`,
        votes: detailItem.vote_count,
        added: `${addedToList.getFullYear()}-${(addedToList.getMonth()+1)}-${addedToList.getDate()}`
    }
}

export function getStorageItemFromDisplayItem (displayItem) {
    return {
        id: displayItem.id,
        added: displayItem.added
    }
}

export function getNewStorageItem (movieId) {
    return {
        id: movieId,
        added: new Date().toISOString()
    }
}