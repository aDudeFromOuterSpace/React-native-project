import { View, Text, TouchableOpacity, ScrollView, Image, Modal, Pressable, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { theme } from '../theme';
import { categoriesData } from '../constants';

export default function Categories() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="space-y-5">
      <View className="mx-5 flex-row justify-between items-center">
        <Text style={{fontSize: wp(4)}} className="font-semibold text-neutral-700">Categories</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{fontSize: wp(4), color: theme.text}}>Expand</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 15}}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        {
            categoriesData.map((cat,index)=>{
                return (
                    <TouchableOpacity key={index} className="flex items-center space-y-2">
                        <Image source={cat.image} className="rounded-3xl" style={{width: wp(20), height: wp(19)}} />
                        <Text className="text-neutral-700 font-medium" style={{fontSize: wp(3)}}>{cat.title}</Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Closed the popup.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{
              categoriesData.map((cat,index)=>{
                return (
                    <TouchableOpacity key={index} className="flex items-center space-y-2 padding-10">
                        <Image source={cat.image} className="rounded-3xl" style={{width: wp(20), height: wp(19)}} />
                        <Text className="text-neutral-700 font-medium" style={{fontSize: wp(3)}}>{cat.title}</Text>
                    </TouchableOpacity>
                )
            })
            }</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
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
