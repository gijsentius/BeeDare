import React from 'react';

class PersonalCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="card">
				<div className="card-content">
					<h6 className="text center-align">{this.props.title}</h6>
					<img src={this.props.image} alt="" className="circle responsive-img center-component"/>
				</div>
			</div>
        )
    }
}