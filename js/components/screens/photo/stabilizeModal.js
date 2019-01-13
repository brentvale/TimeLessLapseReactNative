import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const EXPLANATION = 'Select an area of the image below that should remain fixed throughout the timelapse.  Pick an area with strong contrast, such as the edge of a building, or a distinct feature.'

class StabilizeModal extends Component {
  handleTouchArea = event => {
    console.log("TOUCH EVENT target : ", event.nativeEvent.locationX, event.nativeEvent.locationY);
  };

  render() {
    const { closeModal, modalOpen, firstImg } = this.props;
    console.log("FIRST IMAGE : ", firstImg);
    const imageWidth = Dimensions.get('window').width;
    const imageHeight = imageWidth * (firstImg.height/firstImg.width);
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => closeModal()}>
        <View
          style={styles.modal}
        >
          <View style={{ flex: 1, width: '100%' }}>
            <TouchableOpacity
              onPress={() => closeModal()}
            >
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 9, width: '100%' }}>
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
              <Text>How it works...</Text>
              <Text>{EXPLANATION}</Text>
            </View>
            <TouchableOpacity onPress={e => this.handleTouchArea(e)}
                              style={{ flex: 6 }}
            >
              <View style={{ flex: 1 }}>
                <Image source={{ uri: firstImg.sourceURL }}
                       style={{
                         width: imageWidth,
                         height: imageHeight,
                       }}
                       resizeMode={'cover'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    width: '100%',
  },
});

export default StabilizeModal;