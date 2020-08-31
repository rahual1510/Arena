import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    heading: {
        fontWeight:'500', 
        color: '#000', 
        fontSize:'15rem', 
    },
    maincontainer:{
        flex: 1,
        marginTop:'60rem',
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
    },
})

export default Styles