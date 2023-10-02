import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Draggable from 'react-native-draggable';
import { PanResponder } from 'react-native';

export default RecOn = ({ imageData }) => {
    const [position, setPosition] = useState({ x: 200, y: 200 });
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [photo, setPhoto] = useState(imageData)

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            const { moveX, moveY } = gestureState;
            setPosition({ x: moveX, y: moveY });
        },
    });

    const onLayout = (event) => {
        setSize({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageData }}
                style={styles.image}
                onLayout={onLayout}
            />
            <Draggable
                x={position.x}
                y={position.y}
                minX={0}
                minY={0}
                maxX={size.width - 200}
                maxY={size.height - 200}
                onDragRelease={(event, gestureState, bounds) => {
                  bounds["right"] = 3
                    console.log(bounds)
                }}
            >

                <View style={styles.rectangle} {...panResponder.panHandlers} />
            </Draggable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    rectangle: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: 'rgba(255, 0, 0, 0.5)',
        position: 'absolute',
    },
});
