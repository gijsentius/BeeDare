import React, {Component} from 'react';
import ReactImageUploadComponent from './UploadHelper.js';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {pictures: []};
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures:  this.state.pictures.concat(picture),
        });
    }

    render() {
        return (
            <div>
                <ReactImageUploadComponent
                    withIcon={true}
                    buttonText='Choose image'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                />
            </div>
        );
    }
}

export default Upload;
