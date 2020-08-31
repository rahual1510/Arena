import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    headings: {
        fontSize:'13rem',
        fontWeight:'500'
    },
    titles: {
        flexDirection:'row', 
        borderBottomWidth:1, 
        borderColor:'$theme2', 
        marginTop:'20rem',
        paddingBottom: '5rem',
    },
    innerTitles: {
        borderBottomWidth:1, 
        borderColor:'#E1E3E3', 
        paddingBottom:5,
        marginTop:'10rem',
        marginLeft:'30rem'
    },
    buttons: {
        height:'30rem',
        width: '100rem',
        backgroundColor:'$theme',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    },
    infoView: {
        // borderBottomWidth: 1, 
        // borderColor: '$theme2', 
        width:'70%',
        alignItems:'center',
        justifyContent:'center',
        // flex:1,
        // flexDirection:'row',
        flexWrap:'wrap'
    }
})
export default Styles