import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    heading: {
        fontWeight:'500', 
        color: '#000', 
        fontSize:'15rem', 
    },
    boldTheme: {
        color: '$theme', 
        fontSize:'12rem', 
        fontWeight:'600',
        marginTop:'10rem'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10rem'
    },
    valueText: {
        color: 'grey', 
        fontSize:'12rem', 
        fontWeight:'500',
    },
    container: {
        marginTop:'30rem', 
        backgroundColor:'#FFF', 
        padding:'10rem', 
        borderRadius:'5rem'
    }
})

export default Styles