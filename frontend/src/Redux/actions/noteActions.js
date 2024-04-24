import axios from "axios";
import {
    NOTES_LIST_FAIL,
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS
} from "../constants/noteConstants";
import { BASE_URL } from "../../components/utils";


export const listNotes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTES_LIST_REQUEST
        });
        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${BASE_URL}api/notes`, config)

        dispatch({
            type: NOTES_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NOTES_LIST_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}