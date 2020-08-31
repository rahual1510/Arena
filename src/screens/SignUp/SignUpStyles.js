import EStyleSheet from 'react-native-extended-stylesheet';

const Styles= EStyleSheet.create({
    forgot: {
        alignSelf:'flex-end', 
        marginTop:'15rem',  
        color:'$theme',
        fontSize:'14rem', 
        fontWeight:'500'
    },
    newUser: {
        alignSelf:'center', 
        color:'#6D7278', 
        fontSize:'13rem', 
        marginTop:'15rem'
    },
    signupText: {
        fontWeight:'500', 
        color: '$theme'
    },
    label: {
        fontSize:'13rem', 
        color: '$theme', 
        fontWeight:'500',
        marginBottom: '3rem'
    },
    heading: {
        alignSelf: 'center', 
        color: '$theme',
        marginBottom: '15rem'
    },
    links: {
        color: '$theme',
        fontWeight:'500'
    },
    termsView: {
        flexDirection:'row', 
        marginTop:'40rem', 
        alignItems:'center'
    }
})

export default Styles