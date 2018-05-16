import React, { Component } from 'react';
import Icon from '../icon/Icon.js'
import './Challenge.css'
import OpenChallenges from "./OpenChallenges";

class ProfielPagina extends Component {

    constructor(){
        super();
        this.state = {
            openChallenges: [],
            isLoading: true,
        };
    }

    componentDidMount()
    {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
            .then(response => response.json())
            .then(data => this.setState({openChallenges: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    render() {

        const {openChallenges, isLoading} = this.state;



        return (
            <div>
                <p>{console.log(isLoading)}</p>

                <OpenChallenges openChallenges={openChallenges}/>

            </div>

        );
    }
}

export default ProfielPagina;