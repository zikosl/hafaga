
import * as StandardModule from 'react-native';

// And let's stub out everything that's missing!


delete StandardModule['ViewPropTypes'];

delete StandardModule['ColorPropType'];

delete StandardModule['EdgeInsetsPropType'];

delete StandardModule['PointPropType'];


module.exports = {

  ...StandardModule,

  get ViewPropTypes() {

    return require('deprecated-react-native-prop-types/DeprecatedViewPropTypes');

  },

  get ColorPropType() {

    return require('deprecated-react-native-prop-types/DeprecatedColorPropType');

  },

  get EdgeInsetsPropType() {

    return require('deprecated-react-native-prop-types/DeprecatedEdgeInsetsPropType')

  },

  get PointPropType() {

    return require('deprecated-react-native-prop-types/DeprecatedPointPropType');

  }

}