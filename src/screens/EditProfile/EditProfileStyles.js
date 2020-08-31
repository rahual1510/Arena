import EStyleSheet from 'react-native-extended-stylesheet';

const Styles= EStyleSheet.create({
    label: {
        fontSize:'13rem', 
        color: '$theme', 
        fontWeight:'500',
        marginBottom: '3rem'
    },
    heading: {
        alignSelf: 'center', 
        color: '$theme',
        marginBottom: '15rem',
        fontWeight:'500',
    },
    container: {
        backgroundColor:'#FFF', 
        padding:'10rem', 
        borderRadius:'5rem'
    },
    multiline: {
        borderColor: '$theme2', 
        borderWidth:1, 
        minHeight: '70rem',
        maxHeight: '100rem'
    },
    select: {
        fontSize:'12rem', 
        color: '#6D7278', 
        fontWeight:'100'
    }
})

export default Styles