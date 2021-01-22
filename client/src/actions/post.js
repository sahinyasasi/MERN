import axios from "axios";
import { GET_POSTS, POST_ERROR, UPDATE_LIKE } from "./types";
import { setAlert } from "./alert";
//GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};

//add likes
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};

//remove likes
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
