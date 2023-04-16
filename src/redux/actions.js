export const setMembers = members=>{
    return {
        type: 'SET_MEMBERS',
        members: members
    }
}

export const setYoutube = data=>{
    return {
        type: 'SET_YOUTUBE',
        payload: data
    }
}

export const setFlickr = photos=>{
    return {
        type: 'SET_FLICKR',
        payload: photos
    }
}

