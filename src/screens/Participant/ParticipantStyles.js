import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    
    maincontainer:{
        flex: 1,
        width:'100%',
        alignSelf:'center',
        marginTop:'-5rem',
        // backgroundColor:'red'



       
    },
    innercontainer :{
        paddingRight:'10rem', 
        paddingLeft:'10rem',
        flexDirection:'column' ,


          
    },
    heading: {
        fontWeight:'500', 
        color: '#000', 
        fontSize:'15rem', 
        textAlign :'center',
        marginTop:'-5rem',
        marginBottom:'5rem',

    }, 
    boldTheme: {
        color: '$theme', 
        fontSize:'12rem', 
        fontWeight:'500',
        
    },
    commonSpace:{
        flexDirection: 'row',
        justifyContent : 'space-between',
        // backgroundColor:'red',
        height:30

       
        
    },
    container: {
        marginTop:'5rem', 
        marginBottom : '10rem',
        backgroundColor:'#FFF', 
        padding:'10rem', 
        width: '100%',
        // paddingHorizontal :'5%'
        // borderRadius:'5rem'
    },
    innnerContainer : {
        flex: 1 ,
        flexDirection: 'row',
        
    },
    innerColoumn : {
        flex : 1.1 , 
        flexDirection:'column',
    },
    wrap :{
        flexWrap:'wrap'
    },
    des : {
        fontSize: '12rem',
        

    },
    add : {
        fontSize: '12rem',
        width:'190rem'

    },
    dess : {
        fontSize: '12rem',
        // marginLeft:'50rem'
        alignSelf:'flex-end'
    },
    commonPadding: {
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    profilePic: {
        marginTop: '10rem',
        width: 380,
        height: 180,
        alignSelf:'center',
        resizeMode:'cover', 
        marginBottom: '10rem',
       
    },
    
header:{
    flex:0.1,
    paddingTop:-10

},
footer:{
    flex:0.1
},
shadow:{
        shadowColor: '#ffff',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 1,
        shadowRadius: 11.95,
        // elevation: 10,
    },
    plusMsg:{
    width:45,
    height:45,
    backgroundColor:'red',
    borderRadius:90,
    position:'absolute',
    right:15,
    bottom:80,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0.6,
    borderColor:'$theme'
},
plusMsgIcon:{
    color:'$theme',
    fontSize:23
},
secondHeader:{
    flexDirection:'row',
    width:'100%',
    minHeight:45,
    alignItems:'center',
    backgroundColor:'red',
    paddingLeft:20,
    paddingRight:20
},
backIcon:{
    fontSize:20,
    color:'#fffdbf',
    flex:0.1
},
secondHeaderTitle:{
    fontSize:20,
    color:'#fffdbf',
    textAlign:'center',
    alignSelf:'center',
    flex:0.9,
    fontStyle:'italic',

},
searchBox:{
    fontSize:20,
    color:'#fffdbf',
    textAlign:'center',
    alignSelf:'center',
    flex:0.9,
    fontStyle:'italic',
    height:'100%'    
},
secondHeaderSearch:{
    flex:0.1,
    fontSize:20,
    color:'#fffdbf',



},
footer:{
        flex:0.2
},
itemBody:{
    backgroundColor:'#fffdbf',
    


},
itemBodyUnread:{
    backgroundColor:'$theme',
},
itemBodyUnreadLast:{
    backgroundColor:'$theme',
    borderBottomEndRadius:30,
    borderBottomStartRadius:30
},
roundGreen:{
    width:25,
    height:25,
    marginTop:5,
    backgroundColor:'$theme',
    borderRadius:90,
    alignItems:'center',
    justifyContent:'center'

},
itemUnreadCount:{
    color:'$theme',
    textAlign:'center',

},


imageUriView:{
    flex:0.2,
    alignItems:'center',
    justifyContent:'center',

},
imageUri:{
    width:'60rem',
    height:'60rem',
    borderRadius:'30rem',
    marginRight:'30rem',
    marginTop:'-5rem'

},
itemDetails:{
    flex:0.6,
    marginTop:'-5rem',
   
},
lastName:{
    color: '$theme', 
    fontSize:'14rem', 
   fontWeight:'500',
   marginTop:'5rem',
   marginLeft:'5rem'
   
},
FirstName:{
    color: '$theme', 
    fontSize:'14rem', 
   fontWeight:'500',
   marginTop:'5rem'
   
},
itemNameUnread:{
    color:'$theme',
    fontSize:12
},
itemMessage:{
    color:'$theme',
    fontSize:12,
    height:20
   
},
itemSport:{
    color:'$theme',
    fontSize:12,
   
   
},
itemStatus:{
    color:'green',
    fontSize:12,
    height:20,
    fontWeight:'500',
},
itemStatusBlk:{
    color:'red',
    fontSize:12,
    height:20,
    fontWeight:'500',
},
itemMessageUnread:{
    color:'black',
    fontSize:14,
    marginTop:5
},
itemTimeView:{
    flex:0.11,
},
itemTime:{
    color:'$theme',
    fontSize:12
},
itemTimeUnread:{
    color:'#ffff',
    fontSize:12
},
Box:{
    flexDirection:'row',
    margin:'15rem',
    // backgroundColor:'red',
    alignSelf:'center'
    
},
navigationButton: {
        flex: 0.8,
        // backgroundColor:'red'
    },

})

export default Styles