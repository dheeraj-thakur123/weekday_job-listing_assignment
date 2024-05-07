import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE
} from '../action/actionType'

const initialState = {
  jobs: [],
  roles: [],
  loading: false,
  error: null,
  limit: 12, // Initial limit
  offset: 0, // Initial offset
  hasMore: true // Indicates whether there are more items to fetch
}

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.concat(action.payload), // Merge new data with existing data
        loading: false,
        offset: state.offset + state.limit, // Increment offset
        hasMore: action.payload.length === state.limit // Check if there are more items to fetch // Check if there are more items to fetch
      }
    case FETCH_JOBS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default jobReducer
