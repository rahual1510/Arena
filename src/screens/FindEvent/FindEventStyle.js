import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    heading: {
        fontWeight:'500', 
        color: '#0D3447', 
        fontSize:'15rem',
        paddingBottom:'5rem' 
    },
    maincontainer:{
        flex: 1,
    },
    container: {
        marginTop:'45rem', 
        marginBottom:'-20rem',
        backgroundColor:'#FFF', 
        padding:'10rem', 
        width: '100%',
        borderRadius:'5rem'
    },
    innnerContainer : {
        // flex: 1 ,
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
    }
})

export default Styles