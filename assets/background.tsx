import { View, Text, ImageBackground } from 'react-native'
import React, { Children } from 'react'

const background = (Children) => {
  return (
    <View>
      <ImageBackground source={require("../assets/Rectangle17.png")} 
                style = {{height : '100%'}}/>
            <View>
                {Children}
            </View>
    </View>
  )
}

export default background