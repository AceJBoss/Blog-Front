import http from '../config/http-common'
import authHeader from './auth-header';

const createPost = data => {
    return http.post("/create-post", data, { headers: authHeader() });
};

const createComment = data => {
    return http.post("/post-comment", data, { headers: authHeader() });
};

const fetchPost = () => {
    return http.get("/fetch-posts", { headers: authHeader() })
}


export default {
    createPost, createComment, fetchPost
}