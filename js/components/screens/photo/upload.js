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
    };
  }

  options = {
    mediaType: 'photo',
    multiple: true,
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => this.onUploadPress()}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4 }}>
          {Boolean(this.state.images.length)
            && <ScrollView
                  style={styles.scroll}
                >
                  <View style={styles.scrollInner}>
                    {this.state.images.map(imgObj => <ImageDisplay imgObj={imgObj} key={imgObj.filename}/>)}
                  </View>
               </ScrollView>}
        </View>
      </View>
    );
  }
}

const ImageDisplay = ({ imgObj }) => (
  <View style={{ height: 100, width: 100, margin: 2 }}>
    <Image source={{ uri: imgObj.sourceURL }}
           style={styles.imageContainer}
           resizeMode={'contain'}
    />
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: '100%',
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
