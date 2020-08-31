import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, TextInput, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Styles from './GroupChatStyles';
import strings from '../../util/strings';
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ImagePick from '../../components/ImagePick';
import types from '../../types';
import * as Validations from '../../util/Validations';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { Api } from '../../APIs/Api'
import Config from '../../APIs/ApiConfig'

dp = (size) => EStyleSheet.value(size + 'rem')
export class GroupChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groupChatId: null,
      messageGroupId: null,
      messageText: "",
      messages: [],
      // data: [
      //   {id:1,  type:'in',   message: "Nadal, can you please let me know the price of that condo?"},
      //   {id:2,  type:'in',   message: "I am thinking to take it!!"} ,
      //   {id:3,  type:'out',  message: "Hey Melvin, I need to check That post is quite old."}, 


      // ],
      Images: [
        { id: 1, type: 'out', imageUri: require('../../assets/icons/imgs/img-1.png') },

      ]

    };
  }

  componentWillMount = async () => {
    await this.setState({
      groupChatId: this.props.navigation.getParam("senderPersonId") + "-" + this.props.navigation.getParam("receiverPersonId")
    })
    this.getChat()
  }

  getChat = async () => {
    firestore()
      .collection('GroupChat')
      .doc(String(this.state.groupChatId))
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          this.getMessages(documentSnapshot.data().messageID)
        }
        else {
          firestore()
            .collection('GroupChat')
            .doc(this.state.groupChatId)
            .set({
              messageID: this.state.groupChatId,
            })
            .then(() => {
              console.log('User added on firestore!');
              firestore()
                .collection('GroupChat')
                .doc(this.props.navigation.getParam("receiverPersonId") + "-" + this.props.navigation.getParam("senderPersonId"))
                .set({
                  messageID: this.state.groupChatId,
                })
                .then(() => {
                  console.log('User added on firestore!');
                });
            });
        }
      });
  }

  getMessages = async (messageID) => {
    this.setState({
      messageGroupId: messageID
    })
    firestore()
      .collection(String(messageID))
      .onSnapshot(this.onResult, this.onError);
  }

  onResult = async (QuerySnapshot) => {
    let messages = []
    QuerySnapshot.forEach(documentSnapshot => {
      let data = {
        date: documentSnapshot.id,
        msg: documentSnapshot.data().messages
      }
      messages.push(data)
    });
    await this.setState({
      messages
    })
  }

  onError = (error) => {
    console.error(error);
  }


  renderDate = (date) => {
    return (
      <Text style={{
        alignSelf: 'flex-end',
        fontSize: 12,
        color: 'red',
      }}>
        {date}
      </Text>
    );
  }

  onChangeText = (text) => {
    this.setState({
      messageText: text
    })
  }

  sendMessage = async (type, url) => {
    if (this.state.messageText !== "" || type === "image") {
      let messages = []
      let timeStamp = moment().format('DD-MM-YYYY');
      let data = {
        type: type,
        message: type === "image" ? url : this.state.messageText,
        senderId: this.props.navigation.getParam("senderPersonId")
      }
      if (this.state.messages.length) {
        if (timeStamp === this.state.messages[this.state.messages.length - 1].date) {
          messages = this.state.messages[this.state.messages.length - 1].msg
        }
      }
      messages.push(data)
      firestore()
        .collection(this.state.messageGroupId)
        .doc(String(timeStamp))
        .set({
          messages,
        })
        .then(() => {
          this.setState({
            messageText: ""
          })
          console.log('Messages updated!');
        });
    }
  }

  uploadImage = async (image) => {
    data = {
      image_data: image.toString()
    }
    let res = await new Api().postJSON(Config.uploadImage, data)
    if (res && res.response_code === 200) {
      this.sendMessage("image", res.image_url)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={ref => this.scrollView = ref}
          style={{ flex: 1 }}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          <Header title={'CHAT'} search back goBack={() => this.props.navigation.goBack()}>
            <View>
              {
                this.state.messages.length ?
                  this.state.messages.map((dates) => {
                    return (
                      <>
                        <View style={styles.UpLineView}>
                          <View style={styles.Line} />
                          <Text style={{ fontSize: 12, }}>{dates.date}</Text>
                          <View style={styles.Line2} />
                        </View>
                        {
                          dates.msg.map((item) => {
                            return (
                              item.senderId === this.props.navigation.getParam("senderPersonId") ?
                                item.type === "image" ?
                                  <View>
                                    <View style={styles.iImage}>
                                      <Text style={styles.UpNmae}>{this.props.navigation.getParam("senderName")}</Text>
                                      <Image source={{ uri: item.message }} style={styles.Images} />
                                    </View>
                                  </View>
                                  :
                                  <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 30 }}>
                                    <View style={{}}>
                                      <Text style={styles.box}>{item.message}</Text>
                                    </View>
                                    <View style={{ marginRight: 7, width: 75 }}>
                                      <View style={styles.imageView2}>
                                        <Image source={Images.dummyPic} style={styles.profile} />
                                      </View>
                                      <Text style={styles.profileNameOut}>{this.props.navigation.getParam("senderName")}</Text>
                                    </View>
                                  </View>
                                :
                                item.type === "image" ?
                                  <View>
                                    <View style={styles.iImage}>
                                      <Text style={styles.UpNmae}>{this.props.navigation.getParam("receiverName")}</Text>
                                      <Image source={{ uri: item.message }} style={styles.Images} />
                                    </View>
                                  </View>
                                  :
                                  <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <View style={styles.layOut}>
                                      <View style={styles.imageView}>
                                        <Image source={Images.dummyPic} style={styles.profile} />
                                      </View>
                                      <Text style={styles.profileNameIn}>{this.props.navigation.getParam("receiverName")}</Text>
                                    </View>
                                    <View style={{}}>
                                      <Text style={styles.balloon}>{item.message}</Text>
                                    </View>
                                  </View>
                            )
                          })
                        }
                      </>
                    )
                  })
                  :
                  null
              }

              {/* <View style={styles.UpLineView}>
                <View style={styles.Line} />
                <Text style={{ fontSize: 12, }}>11-28-2019</Text>
                <View style={styles.Line2} />
              </View>


              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <View style={styles.layOut}>
                  <View style={styles.imageView}>
                    <Image source={Images.dummyPic} style={styles.profile} />
                  </View>
                  <Text style={styles.profileNameIn}>John Doe</Text>
                </View>
                <View style={{}}>
                  <Text style={styles.balloon}>Nadal, Can you please let me know the price of that condo?</Text>
                </View>
              </View>


              <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 30 }}>
                <View style={{}}>
                  <Text style={styles.box}>Hey Melvin, I need to check. That post is quite old.</Text>
                </View>
                <View style={{ marginRight: 7, width: 75 }}>
                  <View style={styles.imageView2}>
                    <Image source={Images.dummyPic} style={styles.profile} />
                  </View>
                  <Text style={styles.profileNameOut}>John Doe</Text>
                </View>
              </View>


              <View style={styles.LineView}>
                <View style={styles.Line} />
                <Text style={{ fontSize: 12, }}>11-29-2019</Text>
                <View style={styles.Line2} />
              </View>



              <View>
                <View style={styles.iImage}>
                  <Text style={styles.UpNmae}>John Doe</Text>
                  <Image source={Images.tile1} style={styles.Images} />
                </View>

              </View> */}
            </View>
          </Header>
        </ScrollView>



        <ImagePick
          ref={refs => this.imagePicker = refs}
          onSelectImage={(image) => {
            this.uploadImage(image)
          }}
        />
        <Loader show={this.props.loading} />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnSend} onPress={() => this.imagePicker.showPicker()}>
            <Image source={Images.ChatPlus} style={styles.ChatPlus} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.messageText}
              placeholder="Give me 2 mins..."
              multiline
              underlineColorAndroid='transparent'
            />
          </View>

          <TouchableOpacity activeOpacity={0.5} onPress={() => this.sendMessage("text")} style={styles.btnSend}>
            <Image source={Images.SendIcon} style={styles.iconSend} />
          </TouchableOpacity>
        </View>
      </View >






    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}
const styles = EStyleSheet.create({
  container: {
    height: '100%',

  },
  Line: {
    borderBottomColor: '#63B199',
    borderBottomWidth: '1rem',
    marginRight: '5rem',
    width: '38%',
    alignSelf: 'center',
  },
  Line2: {
    borderBottomColor: '#63B199',
    borderBottomWidth: '1rem',
    width: '38%',
    alignSelf: 'center',
    marginLeft: '5rem'
  },
  LineView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '15rem',
    marginBottom: '5rem'
  },
  UpLineView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5rem'
  },
  imageView: {
    marginLeft: '10rem',
    paddingLeft: '5rem'

  },
  profile: {
    height: '45rem',
    width: '45rem',
    borderRadius: '22.5srem'
  },
  profileNameIn: {
    marginLeft: '14rem',
    fontSize: '11rem',

  },
  profileNameOut: {
    marginLeft: '8rem',
    fontSize: '11rem',

  },
  UpNmae: {
    alignSelf: 'flex-end',
    fontSize: '12rem',
    marginRight: '5rem',
    marginTop: '5rem',
    marginBottom: '5rem'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  imageView2: {
    paddingLeft: '5rem',
    marginLeft: '5rem'

  },
  list: {
    paddingHorizontal: '15rem',
  },
  footer: {
    flexDirection: 'row',
    height: '50rem',
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    padding: '5rem',
    width: "100%",
    bottom: 0,
    position: "absolute"

  },
  btnSend: {
    width: '40rem',
    height: '40rem',
    borderRadius: '20rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: '35rem',
    height: '35rem',
    alignSelf: 'center',
  },
  ChatPlus: {
    width: '22rem',
    height: '22rem',
    alignSelf: 'center',
  },
  inputContainer: {
    borderColor: '#63B199',
    backgroundColor: '#FFFFFF',
    borderRadius: '30rem',
    borderWidth: '1rem',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: '10rem',
    paddingRight: '10rem',

  },
  inputs: {
    height: '100%',
    marginLeft: '16rem',
    fontSize: '12rem',
    borderBottomColor: '#FFFFFF',

  },
  balloon: {
    backgroundColor: 'lightgrey',
    padding: '12rem',
    fontSize: '12rem',
    borderRadius: '10rem',
    marginLeft: '10rem',
    maxWidth: '270rem',
    fontWeight: '100',
    // letterSpacing: 1,
    // textDecorationStyle: 'solid', 
  },

  box: {
    backgroundColor: 'lightgrey',
    padding: '12rem',
    fontSize: '12rem',
    borderRadius: '10rem',
    marginLeft: '10rem',
    maxWidth: '265rem',
    color: 'white',
    backgroundColor: '#E91E63'

  },
  Images: {
    height: '140rem',
    width: '320rem',
    borderRadius: '8rem'
  },
  iImage: {
    maxWidth: 350,
    marginTop: '-5rem',
    marginRight: '20rem',
    alignSelf: 'flex-end',

  },
  layOut: {
    flexDirection: 'column',


  },
  images: {
    marginVertical: '10rem',

  },
})
export default connect(mapStateToProps, mapDispatchToProps)(GroupChat)
