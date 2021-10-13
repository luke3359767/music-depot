/** @jsxRuntime classic */
/** @jsx jsx */
import React,{useContext,useState} from 'react';
import {css,jsx} from "@emotion/react"
import { StoreContext } from '../index'
import axios from 'axios';

const CSS=css`    

`

const Library=()=>{
    const {state,dispatch}=useContext(StoreContext);
    
    const [myState,setState]=useState({
            title: '',
            isbn:'',
            author:'',
            description:'',
            published_date:'',
            publisher:''
          
    });
    const data = {
        title: myState.title,
        isbn: myState.isbn,
        author: myState.author,
        description: myState.description,
        published_date: myState.published_date,
        publisher: myState.publisher
      };

    axios.post('http://localhost:5000/api/books', data)
        .then(res => {
            setState({
            title: '',
            isbn:'',
            author:'',
            description:'',
            published_date:'',
            publisher:''
        })})
        .catch(err => {
            console.log(`Error in CreateBook!${err}`);
          })
    return(
        <h1>{myState}</h1>

    );
}

export default Library;