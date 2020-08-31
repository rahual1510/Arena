import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    heading: {
        fontWeight:'500', 
        color: '#000', 
        fontSize:'14rem',
        // marginTop:'12rem' 
    },
    maincontainer:{
        flex: 1,
        marginBottom:'20%'
    },
    container: {
        flexDirection: 'column',
        marginBottom : '10rem',
        width: '100%',
        height :'100%',
        alignItems :'center',
        padding : '5rem'
    },
    picsView : {
        flexDirection:'row',
        width:'95%',
        justifyContent:'space-between',
        marginTop:'30rem',
        marginBottom:'25rem',
    },
    innerPicView :{
        flex:2,
        alignItems:'center',
        justifyContent:'center'
    },
    textView: {
        position : 'absolute',
        fontWeight:'500',
        fontSize :'11rem',
        color :'white'
    },
    lineView :{
        width:'70%',
        borderWidth:1,
        borderColor:'#99FFCC',
        marginBottom:'15rem'
    },
    tileView : {
        fontWeight:'600', 
        color: '#000', 
        fontSize:'15rem',
        // margin:'13rem' 
    },
    boldTheme: {
        color: 'black', 
        fontSize:'14rem', 
        fontWeight:'500',
        alignSelf :'flex-start',
        padding:'10rem'
    },
    emptyText:{
        justifyContent: 'center',
         alignItems: 'center',
         height: '80%'
    },
    emptyTextStyle:{
        fontSize: '14rem',
         fontWeight: '600',
          textAlign: 'center',
           color: 'black'
    },
    emptyTextStyle1:{
        fontSize: '14rem',
         fontWeight: '600',
          textAlign: 'center',
           color: '#63B199'
    }
})

export default Styles