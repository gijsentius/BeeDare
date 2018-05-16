import React, { Component } from 'react';
import './Message.css';


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

      <div className="row">
         <div className="col s12 m6">
           <div className="card yellow darken-2">
             <div className="card-content">
               <span className="username">{this.props.name}</span>
               <div className="body">
               {this.props.body}
               </div>
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
