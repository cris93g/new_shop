import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

var firebaseConfig = {
  apiKey: "AIzaSyArop4-u84qtATaELPYF3970e3oLEG7jcE",
  authDomain: "fileupload-184ad.firebaseapp.com",
  databaseURL: "https://fileupload-184ad.firebaseio.com",
  projectId: "fileupload-184ad",
  storageBucket: "fileupload-184ad.appspot.com",
  messagingSenderId: "791789804472",
  appId: "1:791789804472:web:8aa0297a37486f0acbcd4d",
  measurementId: "G-HJEZ77F0NM"
};

firebase.initializeApp(firebaseConfig);

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarURL: "",
      avatarImg: ""
    };
  }
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
  render() {
    console.log(this.state.avatarURL);
    return (
      <div>
        {" "}
        <label
          style={{
            backgroundColor: "steelblue",
            color: "white",
            padding: 5,
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          Upload
          <FileUploader
            hidden
            accept="image/*"
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple
          />
        </label>
        <div>
          {this.state.avatarURL ? (
            <img
              src={this.state.avatarURL}
              style={{ width: "500px", height: "500px" }}
            />
          ) : (
            <div>
              <p>no file yet uploaded</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Upload;
