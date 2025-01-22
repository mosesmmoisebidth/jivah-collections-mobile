import React, { useEffect, useState } from 'react';
import { Animated, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

interface SlideshowProps {
    data: any[]; // Array of data (items to display)
    renderItem: (item: any, index: number) => JSX.Element; // Custom render function for each item
}

const Slideshow: React.FC<SlideshowProps> = ({ data, renderItem }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollX = new Animated.Value(0);

    // Handle the image change every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            changeImage();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    // Change the image index
    const changeImage = () => {
        const nextIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(nextIndex);
    };

    // Interpolating the scrollX to get the current image
    const dotPosition = scrollX.interpolate({
        inputRange: data.map((_, i) => i * width),
        outputRange: data.map((_, i) => (i === currentIndex ? 1 : 0.6)),
        extrapolate: 'clamp',
    });

    const renderDotIndicators = () => (
        <View style={tw`absolute bottom-5 left-0 right-0 flex-row justify-center`}>
            {data.map((_, index: number) => (
                <View
                    key={index}
                    style={[
                        tw`w-3 h-3 mx-1 rounded-full`,
                        { backgroundColor: index === currentIndex ? '#c48647' : 'gray' },
                    ]}
                />
            ))}
        </View>
    );

    const renderSlides = () => {
        return data.map((item: any, index: number) => (
            <Animated.View
                key={index}
                style={[styles.slideContainer, { width }]}
            >
                {renderItem(item, index)} {/* Render the custom item */}
            </Animated.View>
        ));
    };

    return (
        <View style={styles.container}>
            {/* Slide Show */}
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                onMomentumScrollEnd={(e) => {
                    const contentOffsetX = e.nativeEvent.contentOffset.x;
                    const currentIndex = Math.floor(contentOffsetX / width);
                    setCurrentIndex(currentIndex);
                }}
            >
                {renderSlides()}
            </Animated.ScrollView>

            {/* Dot Indicators */}
            {renderDotIndicators()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: 200, // Set height to 64 as requested
        overflow: 'hidden', // Hide overflow for the height
    },
    slideContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 64, // Ensure the slide takes full height of the container
    },
});

export default Slideshow;
