import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    heading: {
        fontWeight:'500', 
        color: '#000', 
        fontSize:'15rem', 
    },
    maincontainer:{
        flex: 1,
    },
    container: {
        marginTop:'5rem', 
        marginBottom : '10rem',
        backgroundColor:'#FFF', 
        padding:'10rem', 
        width: '100%',
        position : 'relative',
        // paddingHorizontal :'5%'
        borderRadius:'5rem',
    },
    container1: {
        marginBottom : '10rem',
        backgroundColor:'#FFF', 
        padding:'10rem', 
        width: '100%',
        position : 'relative',
        justifyContent : 'space-between',
        flexDirection: 'row',
        borderRadius: 4,
        // borderBottomWidth:5,
        // borderBottomColor:'$theme'
    },
    innnerContainer : {
        flex: 1 ,
        flexDirection: 'row',
        
    },
    innerColoumn : {
        flex : 1.1 , 
        flexDirection:'column',
    },
    des : {
        flex: 1, flexWrap: 'wrap',
        fontSize: '10rem',
        
    },
    commonPadding: {
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    textstyle : {
        fontSize :'11rem',
        
    }
})

export default Styles