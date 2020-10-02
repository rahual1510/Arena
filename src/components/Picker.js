import React, { Component, useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native'
import Images from '../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import countryList from '../util/countrycodes'
import commonStyles from '../util/commonStyles';
import strings from '../util/strings';


const PickerComponent = (props) => {

    const { disabled, country, value, list, fnc, phone, valueInput, onChange, placeholder, sport } = props

    const [show, setShow] = useState(false)

    const onChangeNumber = (number) => {

        onChange(number)

        let i = countryList.findIndex((obj) => obj.dial_code == number)

        if (i >= 0) {
            fnc(i)
            onChange('')
        }
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => setShow(true)} style={[Styles.borderBottom, Styles.container, phone ? null : { justifyContent: 'space-between', paddingVertical: dp(5) }]} disabled={disabled} >

            <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                {country || phone ?
                    <Image source={{ uri: `https://www.countryflags.io/${countryList[value].code}/flat/64.png` }} style={Styles.flag} />
                    : null}

                {phone ?
                    <Image source={Images.downarrow} style={Styles.downArrow} />
                    : null}

                <Text style={{ color: value >= 0 ? '#909090' : null }} >
                    {value >= 0 ?
                        country ? countryList[value].name
                            : phone ? countryList[value].dial_code
                                : sport ? list[value].name
                                    : list[value]
                        : placeholder}
                </Text>

            </View>

            {phone ?
                <TextInput
                    placeholder={strings.phone}
                    value={valueInput}
                    onChangeText={(text) => onChangeNumber(text)}
                    style={Styles.textInput}
                    placeholderTextColor='#909090'
                    maxLength={10}
                    keyboardType='phone-pad'
                    editable={!disabled}
                />
                :
                <Image source={Images.downarrow} style={Styles.downArrow} />
            }

            <Modal
                visible={show}
                transparent={true}
                animated
                animationType='slide'
            >
                <TouchableOpacity activeOpacity={1} onPress={() => setShow(false)} style={Styles.listOuter} >

                    <View style={[Styles.list, commonStyles.shadow]} >
                        <FlatList
                            data={country || phone ? countryList : list}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={`option${index}`} style={Styles.listItem} onPress={() => {
                                        setShow(false)
                                        fnc(index)
                                    }} >
                                        <Text>{country || sport ? item.name : phone ? item.name + ' ' + item.dial_code : item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            ItemSeparatorComponent={() => <View style={[commonStyles.seperator, { width: '90%', alignSelf: 'center' }]} />}
                            keyExtractor={(item, index) => `option${item}${index}`}
                        />
                    </View>

                </TouchableOpacity>
            </Modal>
        </TouchableOpacity>
    )
}


const Styles = EStyleSheet.create({
    borderBottom: {
        borderBottomColor: '$theme2',
        borderBottomWidth: 1
    },
    flag: {
        width: '18rem',
        height: '18rem',
        resizeMode: 'contain',
        marginRight: '10rem'
    },
    downArrow: {
        width: '12rem',
        height: '12rem',
        resizeMode: 'contain',
        marginHorizontal: '4rem'
    },
    listOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    list: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    listItem: {
        padding: '12rem',
        width: '90%',
        alignSelf: 'center'
    },
    container: {
        marginBottom: '10rem',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '10rem',
    },
    textInput: {
        fontSize: '13rem',
        textAlignVertical: 'center',
        marginLeft: '10rem',
        paddingVertical: '6rem',
        flex: 1
    }

})

export default PickerComponent