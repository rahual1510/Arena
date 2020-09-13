/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    View,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import Images from '../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavigationService from '../NavigationService';
import { TextInput } from 'react-native-gesture-handler';

const dp = size => EStyleSheet.value(size + 'rem');

const { height, width } = Dimensions.get('window');

const image = [Images.getstartedimg1];

class headerLogo extends Component {
    render() {
        const {
            icon,
            title,
            back,
            image,
            noLogo,
            onMapPress,
            onBackPress,
            onImagePress,
            drawer,
            nomap,
            noAdd,
            onImageClick,
            goBack,
            search,
            placeholderText,
            searchValue,
            fnc,
            onPressFilter,
            filter,
        } = this.props;

        return (
            <KeyboardAvoidingView
                style={{ flexGrow: 1, height: '100%' }}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                enabled
                keyboardVerticalOffset={Platform.OS == 'android' ? 80 : 20}>
                <ScrollView
                    bounces={false}
                    ref={refs => (this.scroll = refs)}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scroll}>
                    <ImageBackground
                        source={Images.header}
                        style={{
                            width: '100%',
                            height: dp(160),
                            alignItems: 'center',
                            paddingTop: dp(10),
                            marginBottom: dp(40),
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: nomap ? 'space-between' : 'center',
                                alignItems: 'center',
                                paddingHorizontal: 16,
                            }}>
                            {back || drawer ? (
                                <TouchableOpacity
                                    style={!nomap ? styles.backButton : null}
                                    onPress={() => {
                                        if (drawer) {
                                            NavigationService.toggleDrawer();
                                        } else {
                                            if (onBackPress) {
                                                onBackPress();
                                            } else {
                                                goBack();
                                            }
                                        }
                                    }}
                                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
                                    <Image
                                        style={{}}
                                        source={drawer ? Images.menu : Images.leftarrow}
                                    />
                                </TouchableOpacity>
                            ) : null}

                            <Text style={styles.title}>{title.toUpperCase()}</Text>
                            {nomap ? (
                                <View>
                                    <TouchableOpacity
                                        onPress={onMapPress}>
                                        <Image source={Images.mapIcon} />
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>
                        {search ? (
                            <View style={{ width: '80%', marginTop: dp(15) }}>
                                <Image
                                    style={{ width: dp(15), height: dp(15), margin: dp(15) }}
                                    source={Images.searchicon}
                                />
                                <TextInput
                                    value={searchValue}
                                    onChangeText={text => {
                                        fnc(text);
                                    }}
                                    style={styles.multiline}
                                    maxLength={100}
                                    placeholder={placeholderText}
                                    placeholderTextColor={'white'}
                                />
                            </View>
                        ) : null}
                    </ImageBackground>

                    <View
                        style={{
                            alignSelf: 'center',
                            top: image ? dp(90) : dp(75),
                            position: 'absolute',
                        }}>
                        {noLogo ? null : image ? (
                            <View>
                                <Image source={image} style={styles.profilePic} />
                                <TouchableOpacity
                                    style={{ alignSelf: 'flex-end' }}
                                    onPress={() => onImagePress()}>
                                    <Image source={icon} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                                <Image source={Images.headerImage} style={{}} />
                            )}
                    </View>

                    <View style={[styles.container, { top: noLogo ? -dp(130) : null }]}>
                        {this.props.children}
                    </View>
                </ScrollView>
                {noAdd ? (
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            bottom: 10,
                            right: 15,
                        }}
                        onPress={() => onImageClick()}>
                        <Image source={Images.addPlus} />
                    </TouchableOpacity>
                ) : null}
                {filter ? (
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            bottom: 10,
                            right: 15,
                        }}
                        onPress={() => onPressFilter()}>
                        <Image source={Images.filter} />
                    </TouchableOpacity>
                ) : null}
            </KeyboardAvoidingView>
        );
    }
}

const styles = EStyleSheet.create({
    scroll: {
        flexGrow: 1,
        width: '100%',
        paddingBottom: '50rem',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        paddingLeft: '12rem',
        zIndex: 10,
    },
    title: {
        fontSize: '15rem',
        fontWeight: '600',
        color: '#FFF',
        alignSelf: 'center',
        textAlign: 'center',
    },
    headerView: {
        flexDirection: 'row',
        width: '92%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingHorizontal: '20rem',
        width: '100%',
        alignSelf: 'center',
    },
    profilePic: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '$theme2',
        marginHorizontal: '20rem',
        height: '100rem',
        width: '100rem',
        resizeMode: 'cover',
    },
    multiline: {
        borderColor: '#FFFFFF',
        borderWidth: 0.5,
        minHeight: '35rem',
        minWidth: '100%',
        position: 'absolute',
        paddingLeft: '35rem',
        color: '#FFFFFF',
    },
});

export default headerLogo;
