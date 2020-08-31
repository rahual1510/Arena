import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    
    maincontainer:{
        flex: 1,
    },
    label: {
        fontSize:'13rem', 
        color: '$theme', 
        fontWeight:'500', 
    },
    innercontainer :{
        paddingRight:'15rem', 
        paddingLeft:'15rem',
        flexDirection:'column' ,
        flex: 1,
        flexGrow: 1,
        marginBottom: '40%'
    },
    multiline: {
        borderColor: '$theme2', 
        borderWidth:1, 
        minHeight: '70rem',
        maxHeight: '100rem'
    },
    heading: {
        fontWeight:'500', 
        color: '#000', 
        fontSize:'15rem', 
        textAlign :'center'
    }, 
    boldTheme: {
        color: '$theme', 
        fontSize:'12rem', 
        fontWeight:'500',
        marginTop:'10rem'
    },
    commonSpace:{
        flexDirection: 'column',
        // justifyContent : 'space-between',
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
    des : {
        fontSize: '12rem',
    },
    commonPadding: {
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    termsView: {
        flexDirection:'row', 
        marginTop:'20rem', 
        alignItems:'center',
        justifyContent :'center'
    }, links: {
        color: '$theme',
        fontWeight:'500'
    },
})

export default Styles