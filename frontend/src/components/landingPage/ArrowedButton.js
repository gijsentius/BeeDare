import React from "react";

class ArrowedButton extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="center-align">
            <button onClick={this.props.onClick}
                className="center-bottom btn-floating btn-medium waves-effect amber accent-4"><i
                className="material-icons">keyboard_arrow_down</i></button>
            </div>
        );
    }
}

export default ArrowedButton