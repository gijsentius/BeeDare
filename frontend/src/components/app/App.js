import React, {Component} from 'react';
import './App.css';
import ChallengeSmall from '../challenge/ChallengeSmall';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ChallengeSmall 
                    title="test" 
                    image="https://media.licdn.com/dms/image/C4D03AQE24YuGOp9V9A/profile-displayphoto-shrink_200_200/0?e=1529874000&v=beta&t=AE91RlciXSQqE1NXfTJVISYa2bIi8--XmW2N_2ftMcw" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu mauris malesuada, convallis eros at, commodo quam. Phasellus non mollis neque. Vestibulum rhoncus metus facilisis justo accumsan euismod. Fusce placerat pretium arcu, ac cursus est. Sed efficitur enim id pretium condimentum. Pellentesque sollicitudin, lorem at vehicula facilisis, sem lectus mattis orci, a lacinia odio est eget neque. Proin ultricies consequat ligula ut ultrices. Sed laoreet, neque id porta ullamcorper, est elit lacinia lorem, sed euismod erat dolor aliquet tellus. Maecenas mi odio, vehicula placerat convallis ac, mattis non lacus. Sed quis lacus orci." 
                    reward="test"/>
            </div>
        );
    }
}

export default App;
