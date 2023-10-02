import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, PanResponder, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Image } from 'react-native'
import RecOn from './RecOn';


export default function _Camera() {
  const [permission, setPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const [openCam, setOpenCam] = useState(false)
  const [imageData, setImageData] = useState(null)






  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    console.log(type)
  }

  const handelOpenCamera = () => {
    setOpenCam(!openCam)
  }

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data)
        setImageData(data.uri)

      } catch (e) {
        console.log(e)
      }
    }
  }



 

 
  return (
    <View style={styles.container}>
      {
        imageData ?

          <View style={{ flex: 1 }}>
           <RecOn imageData={imageData} />
          </View>
          :
  permission ?
    !openCam ?
      <View style={styles.container}>

        <Button onPress={handelOpenCamera} title="open camera" />
      </View> :
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handelOpenCamera}>
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>

        </View>

      </Camera>
    : <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>We need your permission to show the camera {false}</Text>
      <Button onPress={setPermission} title="grant permission" />
    </View>
}

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    alignSelf: "stretch",

    width: "100%",
    height: "80%"
  },
  resizeHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    zIndex: 1,
  },
});