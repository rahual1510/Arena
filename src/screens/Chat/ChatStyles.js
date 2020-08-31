import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    
    maincontainer:{
        flex: 1,
        width:'100%',
        alignSelf:'center',
        // backgroundColor:'green'



       
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
    flex:0.7,
    marginTop:'-5rem',
    // backgroundColor:'red'
      
},
itemName:{
    color: '$theme', 
    fontSize:'14rem', 
    fontWeight:'500',

  
   
},
itemNameUnread:{
    color:'$theme',
    fontSize:'12rem',
},
itemMessage:{
    color:'$theme',
    fontSize:'12rem',
    marginTop:'-7rem',
    height:20,
    // backgroundColor:'green'
   
},
itemSport:{
    color:'$theme',
    fontSize:'12rem',
    // backgroundColor:'red'
    
   
   
   
},
itemStatus:{
    color:'green',
    fontSize:'12rem',
    height:20,
    fontWeight:'500',
},
itemStatusBlk:{
    color:'red',
    fontSize:'12rem',
    height:20,
    fontWeight:'500',
},

Box:{
    flexDirection:'row',
    margin:'15rem',
    // backgroundColor:'green',
    alignSelf:'center'
    
},
navigationButton: {
        flex: 0.8,
        marginTop: '-2rem',
        // backgroundColor:'red'
    },

})

export default Styles