import axios from "axios";
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  ADD_POST,
} from "./types";
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
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};

//remove likes
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("post removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
//add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/posts", formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("post created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status },
    });
  }
};
