import React, { Component } from 'react';

class Message extends Component {
  constructor(props){
    super(props);
    //this.state = {likes : 0};
    //this.incrementLikes = this.incrementLikes.bind(this);

  }

/*  incrementLikes(){
    this.setState({likes: likes+1});
  } */

//TODO: Add DATE in messages. Maybe avatar too?
  render() {
    return (
        <div className="section center">
            <div className="messageCard">
                <div className="card yellow darken-2">
                    <span className="username">{this.props.name}</span>
                    <div className="body">
                        {this.props.body}
                    </div>

                    <div className="card-action">
                        <button className="action">Like</button>
                        <button className="action">Comment</button>
                    </div>
                </div>
            </div>
        </div>


    );
  } //end render


}

export default Message;
