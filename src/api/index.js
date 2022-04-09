import axios from "axios";

const API = axios.create({ baseURL: 'https://my-stack-app.herokuapp.com/'});

//if logged in, do everything with bearer token
API.interceptors.request.use((req) => {
    const userProfile = localStorage.getItem('profile');
    if(userProfile){
        req.headers.Authorization = `Bearer ${JSON.parse(userProfile).token}`;
    }

    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (comment, id) => API.post(`/posts/${id}/commentPost`, { comment });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);