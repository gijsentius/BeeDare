import React from 'react';
import friendBees from "../../images/friendBees.jpg"
import honey from "../../images/honey.jpg"
import beehives from "../../images/beehives.jpg"

class CardRow extends React.Component{
    render(){
        return(
              <div className="row valign-wrapper">

                <div className="col s3">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-image">
                                <img src={friendBees}/>
                                <span className="card-title">Follow your friends</span>
                            </div>
                            <p><br/>
                                Follow your friends and see how good your friends are doing!
                                Do they have more honey than you?
                                What kind of hives do they follow?
                                See which Dares they accepted and completed!
                            </p>
                        </div>
                    </div>
                </div>

                  <div className="col s3">
                      <div className="card">
                          <div className="card-content">
                              <div className="card-image">
                                  <img src={beehives}/>
                                  <span className="card-title">Become a hive member</span>
                              </div>
                              <p><br/>
                                  Become a member of as many hives you want!
                                  Make new Dares together with your colony.
                                  Start your own hive and become the queen of the hive.</p>
                          </div>
                      </div>
                  </div>

                <div className="col s3">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-image">
                                <img src={honey}/>
                                <span className="card-title">Complete Dares and earn honey</span>
                            </div>
                            <p>
                                <br/>
                                Complete as many Dares as you can and earn gallons of honey!
                                Maybe even earn Royal Jelly ad some point.
                                By completing Dares you earn honey points.
                                The more points you have, the higher up the bee rank you go!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default CardRow