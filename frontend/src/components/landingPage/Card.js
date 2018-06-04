import React from "react";

class Card extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="col s3">
                <div className="card">
                    <div className="card-content">
                        <div className="card-image">
                            <img src={this.props.image}/>
                            <span className="card-title">{this.props.title}</span>
                        </div>
                        <p><br/>
                            {this.props.text}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card