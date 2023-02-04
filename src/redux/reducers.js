import { combineReducers } from 'redux';

//초기에 적용될 상태값
const initMember = {
    members: []
}

const mode = {
    color:  'white'
}

//initMember를 초기값으로 지정해서 객체정보값을 반환하는 reducer함수 정의
//이때 두번째 인수인 action객체로부터 type(액션이름)과 payload(자식컴포넌트에서 전달받을 값)을 받음
export const modeReducer = (state=mode, action)=>{
    switch (action.type) {
        case 'SET_MODE' :
            return {...state, color: action.payload}
        default:
            return state;
    }

}

export const departmentReducer = (state=initMember, action)=>{
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
            return {...state, youtube: action.payload} 
        default :
            return state;
    }
}

export const flickrReducer = (state={flickr: []}, action)=> {
    switch (action.type) {
        case 'SET_FLICKR' :
            return {...state, flickr: action.payload} 
        default :
            return state;
    }
}

//여러개의 reducer들을 하나로 합쳐서 반환
const reducers = combineReducers({
    departmentReducer, youtubeReducer, flickrReducer
})

export default reducers;