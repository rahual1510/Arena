import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    
    maincontainer:{
        flex: 1,
        marginBottom:'45%'
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
        marginBottom:'5rem'
    }, 
    boldTheme: {
        color: '$theme', 
        fontSize:'12rem', 
        fontWeight:'500',
        
    },
    commonSpace:{
        flexDirection: 'row',
        justifyContent : 'space-between',
        marginBottom : '8rem',
        
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
        width: '345rem',
        alignSelf:'center',
        height: '180rem',
        resizeMode:'cover', 
        marginBottom: '5rem',
       
    },
   
})

export default Styles