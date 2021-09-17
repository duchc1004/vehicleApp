import {Dimensions, PixelRatio} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT= Dimensions.get('window').height;

const guidelineBaseWidth = 375;

const scaleSize = size => (WINDOW_WIDTH/guidelineBaseWidth) * size;

const scaleFont = size => size * PixelRatio.getFontScale();

export default sizes = {
    
//font size
FONT_8    : scaleFont(8),
FONT_10   : scaleFont(10),
FONT_12   : scaleFont(12),
FONT_14   : scaleFont(14),
FONT_16   : scaleFont(16),
FONT_18   : scaleFont(18),
FONT_20   : scaleFont(20),
FONT_22   : scaleFont(22),
FONT_24   : scaleFont(24),
FONT_26   : scaleFont(26),
FONT_30   : scaleFont(30),
FONT_40   : scaleFont(40),

//spacing size
WINDOW_WIDTH: WINDOW_WIDTH,
WINDOW_HEIGHT: WINDOW_HEIGHT,
SIZE_1   : scaleSize(1),
SIZE_2   : scaleSize(2),
SIZE_3   : scaleSize(3),
SIZE_5   : scaleSize(5),
SIZE_10  : scaleSize(10),
SIZE_11  : scaleSize(11),
SIZE_12  : scaleSize(12),
SIZE_13  : scaleSize(13),
SIZE_14  : scaleSize(14),
SIZE_15  : scaleSize(15),
SIZE_16  : scaleSize(16),
SIZE_20  : scaleSize(20),
SIZE_23  : scaleSize(23),
SIZE_24  : scaleSize(24),
SIZE_26  : scaleSize(26),
SIZE_30  : scaleSize(30),
SIZE_35  : scaleSize(35),
SIZE_40  : scaleSize(40),
SIZE_44  : scaleSize(44),
SIZE_45  : scaleSize(45),
SIZE_46  : scaleSize(46),
SIZE_48  : scaleSize(48),
SIZE_50  : scaleSize(50),
SIZE_55  : scaleSize(55),
SIZE_60  : scaleSize(60),
SIZE_65  : scaleSize(65),
SIZE_70  : scaleSize(70),
SIZE_71  : scaleSize(71),
SIZE_80  : scaleSize(80),
SIZE_100 : scaleSize(100),
SIZE_110 : scaleSize(110),
SIZE_120 : scaleSize(120),
SIZE_130 : scaleSize(130),
SIZE_140 : scaleSize(140),
SIZE_150 : scaleSize(150),
SIZE_142 : scaleSize(142),
SIZE_170 : scaleSize(170),
SIZE_190 : scaleSize(190),
SIZE_200 : scaleSize(200),
SIZE_210 : scaleSize(210),
SIZE_220 : scaleSize(220),
SIZE_240 : scaleSize(240),
SIZE_260 : scaleSize(260),
SIZE_270 : scaleSize(270),
SIZE_280 : scaleSize(280),
SIZE_285 : scaleSize(285),
SIZE_290 : scaleSize(290),
SIZE_300 : scaleSize(300),
SIZE_310 : scaleSize(310),
SIZE_340 : scaleSize(340),
SIZE_350 : scaleSize(350),
SIZE_355 : scaleSize(355),
}

//Login Logo size


