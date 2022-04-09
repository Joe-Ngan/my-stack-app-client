import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";

import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Pagination from "../Pagination";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

import useStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Home() {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    
    //state
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //search
    const handleKeyPress = (e) => {
        if (e.keyCode === 13)searchPost();
    }
    const searchPost = () => {
        if (search.trim() || tags.length>0) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
    }

    //add tags
    const handleAdd = (tag) => setTags([...tags, tag]);
    //delete tags
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Key Words"
                                onKeyPress={handleKeyPress}
                                fullWidth value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
