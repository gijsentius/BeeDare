import React from 'react';
import ReactDOM from 'react-dom';
import ChallengeSmall from '../components/challenge/ChallengeSmall';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChallengeSmall />, div);
    ReactDOM.unmountComponentAtNode(div);
});