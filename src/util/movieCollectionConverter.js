

export function getDisplayItemFromResult (storageItem, detailItem) {
    const addedToList = new Date(storageItem.added)
    return {
        id: detailItem.data.id,
        title: detailItem.data.original_title,
        year: new Date(detailItem.data.release_date).getFullYear().toString(),
        poster: detailItem.data.poster_path,
        tagline: detailItem.data.tagline,
        score: `${detailItem.data.vote_average * 10}%`,
        votes: detailItem.data.vote_count,
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