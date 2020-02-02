import React from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function Pagination({
  content,
  size,
  containerStyle,
  animatedValue,
  backgroundColor,
  slideWidth
}) {
  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      <View
        style={[
          styles.paginationDots,
          content.length < 4 && { justifyContent: "center" }
        ]}
      >
        {content.map((_, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.dot,
              size && { width: size, height: size, borderRadius: size / 2 },
              idx == 0 && content.length > 4 && { marginLeft: 24 },
              content.length > 4 && {
                transform: [
                  {
                    translateX: Animated.multiply(
                      animatedValue.interpolate({
                        inputRange: [0, slideWidth],
                        outputRange: [0, 12]
                      }),
                      -1
                    )
                  }
                ]
              },
              {
                opacity: Animated.subtract(
                  1,
                  Animated.multiply(
                    Animated.subtract(
                      idx,
                      animatedValue.interpolate({
                        inputRange: [0, slideWidth],
                        outputRange: [0, 1]
                      })
                    ),
                    Animated.subtract(
                      idx,
                      animatedValue.interpolate({
                        inputRange: [1, slideWidth],
                        outputRange: [0, 1]
                      })
                    )
                  )
                ).interpolate({
                  inputRange: [-8, -3, 0, 1],
                  outputRange: [0.1, 0.3, 0.5, 1]
                })
              },
              backgroundColor && { backgroundColor: backgroundColor },

              idx == content.length - 1 && { marginRight: 0 }
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    alignItems: "center",
    backgroundColor: "transparent"
  },
  paginationDots: {
    maxWidth: 56,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  dot: {
    width: 4,
    height: 4,
    marginRight: 8,
    borderRadius: 2
  }
});
