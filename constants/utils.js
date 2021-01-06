import { Platform, StatusBar, Dimensions } from 'react-native';
import { theme } from 'galio-framework';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 4 + StatusHeight);
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);
import moment from "moment";

export const validatePassword = (password) => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return re.test(password);
  };

export const  hasWhiteSpace = (text) => {
    return text.indexOf(' ') >= 0;
}

export const getDates = (startDate, stopDate) => {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
      dateArray.push( moment(currentDate).format('YYYY') )
      currentDate = moment(currentDate).add(1, 'days');
  }
  console.log(dateArray)
  return dateArray;
}