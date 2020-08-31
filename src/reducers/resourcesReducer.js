import types from "../types";

const initialState = {
    categories: [],
    allEvents: [],
    loading: false,
}

export const resourcesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.data
            }
        case types.ALLEVENT_START:
            return {
                ...state,
                loading: true
            }
        case types.ALLEVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                allEvents: action.data
            }


        default:
            return state
    }
}