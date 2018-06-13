import React from "react";
import TeamPhotoRow from "./TeamPhotoRow";

class MeetTeamBox extends React.Component{
    render(){
        return(
            <div>
                <h4 id="textPositionLP" style={{color: "#ffffff", fontWeight:"bold"}}>+++ Meet the team +++ </h4>
                <TeamPhotoRow/>
            </div>
        );
    }
}

export default MeetTeamBox