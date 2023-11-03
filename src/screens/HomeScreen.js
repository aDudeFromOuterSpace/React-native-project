import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';
const ios = Platform.OS=='ios';
const topMargin = ios? 'mt-3': 'mt-10';
export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 "+topMargin}>
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{fontSize: wp(7)}} className="font-bold text-neutral-700">Hello iLovehiking102 !!</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Avatar.jpg')} style={{height: wp(10), width: wp(10)}} />
          </TouchableOpacity>
        </View>

        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder='Search Popular destinations here!'
              placeholderTextColor={'grey'}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>
        <View className="mb-4">
          <Categories />
        </View>
        <View className="mb-4">
          <SortCategories />
        </View>
        <View>
          <Destinations />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}