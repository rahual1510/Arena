import EStyleSheet from 'react-native-extended-stylesheet';

const commonStyles = EStyleSheet.create({
    shadow: {
        elevation:3, 
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 5,
    },
    heading: {
        fontSize:'20rem', 
        fontWeight:'500', 
        alignSelf:'center',
        marginBottom: '20rem'
    },
    seperator: {
        height:2, 
        backgroundColor: '$theme2'
    }
})

export default commonStyles