/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, RefreshControl, Dimensions } from 'react-native';
import Images from '../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../NavigationService';


class ParticipantsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    render() {

        const { noScroll, onRefresh, refreshing, back, title, onBack, comp, goBack, mapPress, donshowmap, showMessageIcon } = this.props;

        return (
            <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} enabled={noScroll ? false : true} keyboardVerticalOffset={Platform.OS == 'android' ? 80 : 20} >

                <LinearGradient colors={['#0E3648', '#397471', '#63B199']} style={[commonStyles.shadow, styles.headerView]} >
                    <View style={styles.titleView} >
                        <TouchableOpacity onPress={() => {
                            if (back) {
                                if (onBack) { onBack(); }
                                else { goBack(); }
                            } else {
                                NavigationService.toggleDrawer();
                            }

                        }}
                            hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} >
                            {back ?
                                <Image source={Images.leftarrow} />
                                :
                                <Image source={Images.menu} />
                            }
                        </TouchableOpacity>

                        <Text style={styles.title} >{title}</Text>

                        {/* <TouchableOpacity onPress={() => NavigationService.navigate('Mapview')}> */}


                        <TouchableOpacity onPress={mapPress}>
                            <Image source={Images.chat} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                {comp ? comp : null}
                <ScrollView contentContainerStyle={styles.scroll} bounces={onRefresh ? true : false} ref={refs => this.scroll = refs} scrollEnabled={noScroll ? false : true}
                    refreshControl={
                        onRefresh ?
                            <RefreshControl refreshing={refreshing} onRefresh={() => {
                                onRefresh();
                            }} />
                            : null
                    }
                    keyboardShouldPersistTaps={'handled'}
                >
                    {this.props.children}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = EStyleSheet.create({
    icons: {
        height: '20rem',
        width: '20rem',
        resizeMode: 'contain',
    },
    title: {
        fontSize: '14rem',
        fontWeight: '500',
        textAlign: 'center',
        color: '#FFF',
    },
    headerView: {
        minHeight: '50rem',
        marginBottom: 2,
        shadowOffset: { width: 0, height: 0.5 },
    },
    titleView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '50rem',
        paddingHorizontal: '15rem',
    },
    keyboard: {
        flexGrow: 1,
        height: '100%',
        backgroundColor: '#F7F7F7',
    },
    scroll: {
        flexGrow: 1,
        width: '100%',
        paddingBottom: '100rem',
        marginTop: '10rem',
    },
});

export default ParticipantsHeader;
