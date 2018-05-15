import React, { Component } from 'react';
import Icon from '../icon/Icon.js'
import './Challenge.css'
import OpenChallenges from "./OpenChallenges";

class ProfielPagina extends Component {

    constructor(){
        super();
        this.state = {
            hits: [],
            isLoading: true,
        };
    }

    componentDidMount()
    {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
            .then(response => response.json())
            .then(data => this.setState({hits: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    render() {

        const {hits, isLoading} = this.state;



        return (
            <div>
                <p>{console.log(isLoading)}</p>

                <OpenChallenges hits={hits}/>

            </div>

        );
    }
}

export default ProfielPagina;