import React from 'react';
import friendBees from "../../images/friendBees.jpg"
import honey from "../../images/honey.jpg"
import beehives from "../../images/beehives.jpg"
import Card from "./Card";

class CardRow extends React.Component{

    render(){

        let textFriends= "Follow your friends and see how good your friends are doing!\n" +
            "                                Do they have more honey than you?\n" +
            "                                What kind of hives do they follow?\n" +
            "                                See which Dares they accepted and completed!";

        let textHives = " Become a member of as many hives you want!\n" +
            "                                  Make new Dares together with your colony.\n" +
            "                                  Start your own hive and become the queen of the hive.";

        let textHoney = "Complete as many Dares as you can and earn gallons of honey!\n" +
            "                                Maybe even earn Royal Jelly ad some point.\n" +
            "                                By completing Dares you earn honey points.\n" +
            "                                The more points you have, the higher up the bee rank you go!";


        return(
              <div className="row valign-wrapper">
                  <Card image={friendBees} title={"Follow your friends"} text={textFriends}/>
                  <Card image={beehives} title={"Become a hive member"} text={textHives}/>
                  <Card image={honey} title={"Complete Dares and earn honey"} text={textHoney}/>
              </div>
        );
    }
}

export default CardRow