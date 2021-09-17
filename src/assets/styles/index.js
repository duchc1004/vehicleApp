import {StyleSheet} from 'react-native'
import colors from './colors';
import sizes from './sizes';

const styles = StyleSheet.create({
    timesheetContainer: {
        flex: 1, 
        backgroundColor:colors.WHITE
    },
    container: {
        flex: 1, 
        backgroundColor:colors.WHITE
    },
    //Login Screen
    loginInput: {
        height: sizes.SIZE_44,
        width: sizes.SIZE_355,
        margin:sizes.SIZE_10,
        borderBottomWidth: sizes.SIZE_1,
        borderRadius:sizes.SIZE_3,
        borderBottomColor:colors.BLUR,
        fontSize:sizes.FONT_20,
        paddingHorizontal:sizes.SIZE_20,
        color:colors.BLACK,
    },

    ruleText:{
        width:sizes.SIZE_355, 
        fontSize:sizes.FONT_18, 
        textAlign:'justify', 
        borderBottomColor:colors.BLACK, 
        borderBottomWidth:2, 
        color:colors.BLACK, 
        paddingBottom:sizes.SIZE_10
    },

    copyRight:{
        fontSize:sizes.FONT_18, 
        borderBottomColor:colors.BLACK,
        color:colors.BLACK,
        marginTop:sizes.SIZE_10
    },

    //Home
    imageBg: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    userInfo:{
        height:sizes.SIZE_110,
        padding:sizes.SIZE_15,
        backgroundColor:colors.DS2, 
        flexDirection:'row', 
        borderWidth:sizes.SIZE_2,
        borderColor:colors.WHITE,
        borderRadius:sizes.SIZE_10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    menuIcon: {
        flex:1, 
        backgroundColor:colors.DS2, 
        margin:sizes.SIZE_10, 
        justifyContent:'center', 
        borderRadius:sizes.SIZE_10, 
        alignItems:'center', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    // Request-Timesheet
    tabQty:{
        flexDirection:'row', 
        borderBottomColor:colors.CLOUD, 
        borderBottomWidth:sizes.SIZE_2, 
        justifyContent:'center', 
        alignItems:'center', 
        paddingHorizontal:sizes.SIZE_10
    },

    textSearchOn:{
        borderBottomWidth:sizes.SIZE_2,
        borderBottomColor:colors.DS2,
        color:colors.DS2,
        fontStyle:'normal', 
    },

    textSearchDefault:{
        fontSize:sizes.FONT_16, 
        height:sizes.SIZE_40,
        backgroundColor:colors.WHITE,
        color:colors.BLUR,
        textAlignVertical:'center',
        textAlign:'center',
        backgroundColor:colors.CLOUD,
    },

    textContainer:{
        flex:7,
        flexDirection:'column', 
        marginBottom:sizes.SIZE_10,
    },

    title: {
        fontSize: sizes.FONT_16,
        color:colors.BLACK,
        backgroundColor:'white',
        paddingHorizontal:sizes.SIZE_10,
        borderRadius:sizes.SIZE_5,
        justifyContent:'center'
    },

    route: {
        fontSize: sizes.FONT_16,
        color:colors.BLUR,
        backgroundColor:'white',
        paddingHorizontal:sizes.SIZE_10,
        borderRadius:sizes.SIZE_5,
        justifyContent:'center',
    },
    
    content: {
        fontSize: sizes.FONT_16,
        color:colors.BLUR,
        backgroundColor:'white',
        paddingHorizontal:sizes.SIZE_10,
        borderRadius:sizes.SIZE_5,
        justifyContent:'center',
    },

    renderView:{
        flex:1, 
        margin:sizes.SIZE_10,
        backgroundColor:colors.WHITE, 
        flexDirection:'row',
        padding:sizes.SIZE_5,
        margin:sizes.SIZE_3,
        borderRadius:sizes.SIZE_5,
        borderWidth:sizes.SIZE_2,
        borderColor:colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    
    //timesheet detail
    dashboard:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.WHITE,
        borderRadius:sizes.SIZE_5,
        borderWidth:sizes.SIZE_1,
        borderColor:colors.CLOUD,
        margin:sizes.SIZE_2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    onDashboadPress:{
        borderColor:colors.DS2,
        borderWidth:sizes.SIZE_2,
    },
    dashImg:{
        height:sizes.SIZE_50,
        width:sizes.SIZE_50,
    },
    status:{
        height:sizes.SIZE_45, 
        flexDirection:'column', 
        backgroundColor:colors.CLOUD, 
        margin:sizes.SIZE_5,  
        paddingTop:sizes.SIZE_5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    dateContainer:{
        flex:1,
        flexDirection:'row', 
        backgroundColor:colors.WHITE,
        height:sizes.SIZE_46,
        borderRadius:sizes.SIZE_5,
        borderWidth:sizes.SIZE_1,
        borderColor:colors.CLOUD,
        margin:sizes.SIZE_2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    dateTitle: {
        flex:1,
        fontSize: sizes.FONT_14,
        color:colors.BLUR,
        textAlignVertical:'center',
        marginLeft:sizes.SIZE_5
    },
    dateContent: {
        flex:2.5,
        fontSize: sizes.FONT_18,
        color:colors.BLACK,
        paddingHorizontal:sizes.SIZE_5,
        textAlignVertical:'center',
        paddingTop: 0,
        paddingBottom: 0
    },

    imageContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.WHITE,
        height:sizes.SIZE_46,
        width:sizes.SIZE_48,
        borderRadius:sizes.SIZE_5,
        borderWidth:sizes.SIZE_1,
        borderColor:colors.CLOUD,
        margin:sizes.SIZE_2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    //Modal
    searchBar:{
        borderRadius:sizes.SIZE_5,
        borderWidth:sizes.SIZE_1,
        borderColor:colors.CLOUD,
        fontSize: sizes.FONT_20,
        color:colors.BLACK,
        paddingHorizontal:sizes.SIZE_10,
        textAlign:'left',
        marginBottom:sizes.SIZE_10,
        backgroundColor:colors.CLOUD,
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },

    bottomView: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-end',
        alignItems: "center"
    },
    cornerView: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    codeModalView: {
        height:sizes.SIZE_240,
        padding: sizes.SIZE_10,
        backgroundColor:colors.WHITE,
        width:sizes.WINDOW_WIDTH,
        marginBottom:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    rejectModalView: {
        height:sizes.SIZE_280,
        padding: sizes.SIZE_10,
        backgroundColor:colors.WHITE,
        width:sizes.WINDOW_WIDTH,
        marginBottom:0,
        borderWidth:sizes.SIZE_1,
        borderColor:colors.CLOUD,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    vehicleModalView: {
        height:sizes.SIZE_280,
        padding: sizes.SIZE_10,
        backgroundColor: colors.WHITE,
        width:sizes.WINDOW_WIDTH,
        marginBottom:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    actionModalView:{
        height:sizes.SIZE_150,
        marginRight: sizes.SIZE_10,
        marginTop: sizes.SIZE_10,
        backgroundColor: colors.WHITE,
        width:sizes.SIZE_130,
        borderRadius:sizes.SIZE_5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    imageBack:{
        margin:sizes.SIZE_5,
        paddingLeft:sizes.SIZE_3, 
        flexDirection:'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        borderRadius:sizes.SIZE_10,
        height:sizes.SIZE_50, 
        backgroundColor:colors.DS2}
});

export {colors, sizes, styles};