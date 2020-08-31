import React, { Component } from 'react'
import { Animated, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10


export default class App extends Component {

  numItems = this.props.images.length?this.props.images.length: 1
  itemWidth = (this.props.width / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  render() {
    let imageArray = []
    let barArray = []
    this.props.images.forEach((image, i) => {
      const thisImage = 
      <TouchableOpacity activeOpacity={1} onPress={this.props.onPress?this.props.onPress: null} key={`image${i}`}>
        <Image
          source={this.props.static?image: {uri: image}}
          style={{ width:this.props.width, height:'100%', resizeMode:'cover'}}
        />
      </TouchableOpacity>
      
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [this.props.width * (i - 1), this.props.width * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View
        style={styles.container}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
          contentContainerStyle={{flexGrow:1,}}
          bounces={false}
          // scrollEnabled
        >

          {imageArray}

        </ScrollView>
        {this.props.images.length>1?
        <View
          style={[styles.barContainer, {bottom: this.props.bottom}]}
        >
          {barArray}
        </View>
        : null
        }
      </View>
    )
  }
}


const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    width: '100%'
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 10,
    width:10,
    borderRadius:5
  },
  bar: {
    backgroundColor: '$theme2',
    height: 10,
    width:10,
    borderRadius:5,
    // position: 'absolute',
  },
})