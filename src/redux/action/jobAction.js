import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE
} from './actionType'
export const fetchJobs = (limit, offset) => async dispatch => {
  dispatch({ type: FETCH_JOBS_REQUEST })
  try {
    // Perform API call here (e.g., using fetch or Axios)
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const body = JSON.stringify({
      limit: limit,
      offset: offset
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body
    }
    const response = await fetch(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      requestOptions
    )
    const data = await response.json()
    dispatch({ type: FETCH_JOBS_SUCCESS, payload:  data.jdList })
  } catch (error) {
    dispatch({ type: FETCH_JOBS_FAILURE, payload: error.message })
  }
}
