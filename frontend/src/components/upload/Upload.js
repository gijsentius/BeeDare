import React, {Component} from 'react';
import ReactImageUploadComponent from './UploadHelper.js';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            result: '',
            folder: this.props.folder
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        return (
            <div className='card'>
                <ReactImageUploadComponent
                    withIcon={false}
                    buttonText='Change profile image'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                />
                <input className='waves-effect waves-light btn amber darken-1 center-component top-button' type="button"
                       value='Submit change' onClick={() => this.submit()}/>
            </div>
        );
    }

    submit() {
        let formData = new FormData();
        formData.append('image', this.state.pictures[0]);
        formData.append('name', 'PietHenk');
        formData.append('folder', this.state.folder);
        fetch('http://127.0.0.1:5000/image', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => this.setState({result: data}))
            .catch(error => console.log(error));
    }
}

export default Upload;
