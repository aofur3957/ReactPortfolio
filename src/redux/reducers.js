import { combineReducers } from 'redux';

export const departmentReducer = (state={members: []}, action)=>{
    switch (action.type) {
        case 'SET_MEMBERS' :
            return {...state, members: action.members}
        default:
            return state;
    }
}

export const youtubeReducer = (state={youtube: []}, action)=> {
    switch (action.type) {
        case 'SET_YOUTUBE' :
            return {...state, youtube: action.youtubes}
        default :
            return state;
    }
}

export const flickrReducer = (state={photos: []}, action)=> {
    switch (action.type) {
        case 'SET_FLICKR' :
            return {...state, photos: action.photos}
        default :
            return state;
    }
}

//여러개의 reducer들을 하나로 합쳐서 반환
const reducers = combineReducers({
    departmentReducer, youtubeReducer, flickrReducer
})

export default reducers;