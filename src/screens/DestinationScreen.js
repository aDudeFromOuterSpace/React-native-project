import { View, Text, Image, TouchableOpacity, ScrollView, Platform, Pressable, Modal, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function DestinationScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const AlertConfirmed = () =>
    Alert.alert('Confirmed!', 'Thank you for using our service! We hope you enjoye your trip!', [
      {
        text: 'Confirm Booking Order',
        onPress: () => console.log('Confirm Pressed'),
        style: 'confirm',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    const AlertDeclined = () =>
    Alert.alert('Booking/Purchase canceled', 'Your request has been abruptly denied, please try again', [
      {
        text: 'Cancel Booking Order',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('Negative Pressed')},
    ]);
  return (
    <View className="bg-white flex-1">
        <Image source={item.image} style={{width: wp(100), height: hp(55)}} />
        <StatusBar style={'light'} />

        <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                className="p-2 rounded-full ml-4"
                style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
            >
                <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> toggleFavourite(!isFavourite)}
                className="p-2 rounded-full mr-4"
                style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
            >
                <HeartIcon size={wp(7)} strokeWidth={4} color={isFavourite? "red": "white"} />
            </TouchableOpacity>
        </SafeAreaView>

        <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14">
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
                <View className="flex-row justify-between items-start">
                    <Text style={{fontSize: wp(7)}} className="font-bold flex-1 text-neutral-700">
                        {item?.title}
                    </Text>
                    <Text style={{fontSize: wp(7), color: theme.text}} className="font-semibold">
                        $ {item?.price}
                    </Text>
                </View>
                <Text style={{fontSize: wp(3.7)}} className="text-neutral-700 tracking-wide mb-2">{item?.longDescription}</Text>
                <View className="flex-row justify-between mx-1">
                    <View className="flex-row space-x-2 items-start">
                        <ClockIcon size={wp(7)} color="skyblue" />
                        <View className="flex space-y-2">
                            <Text style={{fontSize: wp(4.5)}} className="font-bold text-neutral-700">{item.duration}</Text>
                            <Text className="text-neutral-600 tracking-wide">Duration</Text>
                        </View>
                    </View>
                    <View className="flex-row space-x-2 items-start">
                        <MapPinIcon size={wp(7)} color="red" />
                        <View className="flex space-y-2">
                            <Text style={{fontSize: wp(4.5)}} className="font-bold text-neutral-700">{item.distance}</Text>
                            <Text className="text-neutral-600 tracking-wide">Distance</Text>
                        </View>
                    </View>
                    <View className="flex-row space-x-2 items-start">
                        <SunIcon size={wp(7)} color="orange" />
                        <View className="flex space-y-2">
                            <Text style={{fontSize: wp(4.5)}} className="font-bold text-neutral-700">{item.weather}</Text>
                            <Text className="text-neutral-600 tracking-wide">Temperature</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={{backgroundColor: theme.bg(0.8), height: wp(15), width: wp(50)}} className="mb-6 mx-auto flex justify-center items-center rounded-full absolute inset-x-0 top-60" >
                <Text className="color-white" style={{fontSize: wp(5.5)}} onPress={() => setModalVisible(true)}>Booking</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Popup Closed');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
                Would you like to confirm your booking? (This action is irreversible!!)
            </Text>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => setModalVisible(!modalVisible)}
              >
              <TouchableOpacity style={styles.textStyle} onPress={()=>{AlertConfirmed}}><Text>Confirm Booking Order</Text></TouchableOpacity>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
                <TouchableOpacity style={styles.textStyle} onPress={()=>{AlertDeclined}}><Text>Cancel Booking Order</Text></TouchableOpacity>
            </Pressable>
          </View>
        </View>
        </Modal>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    buttonConfirm: {
        backgroundColor: 'red',
      },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });