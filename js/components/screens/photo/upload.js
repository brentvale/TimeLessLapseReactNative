import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { concat } from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';

export default class Upload extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      currentIndex: 0,
    };
  }

  options = {
    mediaType: 'photo',
    multiple: true,
    includeExif: true,
    maxFiles: 20, // iOS only
    forceJpg: true, // Live Photo will be converted to its JPG representation
  };

  componentWillUnmount(){
    if(this.playInterval){
      clearInterval(this.playInterval);
    }
  }

  play = () => {
    this.playInterval = setInterval(() => {
      this.setState({
        currentIndex: this.state.images[this.state.currentIndex + 1] ? this.state.currentIndex + 1 : 0,
      });
    }, 1000);
  };

  pause = () => {
    clearInterval(this.playInterval);
  };

  onUploadPress = () => {
    ImagePicker.openPicker(this.options)
      .then(this.onUpload);
  };

  onUpload = images => {
    const currentImages = this.state.images.slice(0);
    const allImages = concat(currentImages, images);
    this.setState({ images: allImages });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!(this.state.images.length)
        && <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => this.onUploadPress()}>
              <Text>Upload</Text>
            </TouchableOpacity>
          </View>}
        <View style={{ flex: 5 }}>
          {Boolean(this.state.images.length)
          && <View style={{ flex: 1 }}>
              <View style={{ flex: 3 }}>
                <ImagePlayThrough images={this.state.images}
                                  currentIndex={this.state.currentIndex}
                />
              </View>
              <View style={{ flex: 1 }}>
                <PlayAndPauseRow play={this.play}
                                 pause={this.pause}
                />
              </View>
              <View style={{ flex: 6 }}>
                <ImageListScrollView images={this.state.images}
                                     currentIndex={this.state.currentIndex}
                />
              </View>
            </View>}
        </View>
      </View>
    );
  }
}
const ImagePlayThrough = ({ images, currentIndex }) => (
  <View style={{ flex: 1, backgroundColor: 'orange' }}>
    <ImagePlay imgObj={images[currentIndex]} />
  </View>
);

const PlayAndPauseRow = ({ play, pause }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={styles.left}>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={() => play()}
      >
        <Text>Play</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.right}>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={() => pause()}
      >
        <Text>Pause</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ImageListScrollView = ({ images, currentIndex }) => (
  <ScrollView
    style={styles.scroll}
  >
    <View style={styles.scrollInner}>
      {images.map((imgObj, idx) => <ImageDisplay imgObj={imgObj}
                                                 key={imgObj.filename}
                                                 currentIndex={currentIndex}
                                                 index={idx}
      />)}
    </View>
  </ScrollView>
);

const ImageDisplay = ({ imgObj, currentIndex, index }) => {
  const borderColor = currentIndex === index ? 'blue' : 'white';
  return (
    <View style={{ height: 100, width: 100, margin: 2 }}>
      <Image source={{ uri: imgObj.sourceURL }}
             style={[
               styles.imageContainer,
               { borderColor },
             ]}
             resizeMode={'contain'}
      />
    </View>
  );
};

const ImagePlay = ({ imgObj }) => (
  <Image source={{ uri: imgObj.sourceURL }}
         style={{ flex: 1 }}
         resizeMode={'contain'}
  />
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: '100%',
    borderWidth: 1,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controlButton: {
    height: '100%',
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'blue',
    width: 100,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
