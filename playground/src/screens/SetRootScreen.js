const React = require('react');
const Root = require('../components/Root');
const Button = require('../components/Button')
const Navigation = require('./../services/Navigation');
const {
  NAVIGATION_TAB,
  SET_MULTIPLE_ROOTS_BTN,
  SET_ROOT_BTN
} = require('../testIDs');
const Screens = require('./Screens');
const { logLifecycleEvent } = require('./StaticLifecycleOverlay');
let unmounted;

class SetRootScreen  extends React.Component {
  static options() {
    return {
      topBar: {
        title: {
          text: 'Navigation'
        }
      },
      bottomTab: {
        text: 'Navigation',
        icon: require('../../img/navigation.png'),
        testID: NAVIGATION_TAB
      }
    };
  }

  constructor(props) {
    super(props);
    unmounted = false;
  }

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button label='Set Root' testID={SET_ROOT_BTN} onPress={this.setSingleRoot} />
        <Button label='Set Multiple Roots' testID={SET_MULTIPLE_ROOTS_BTN} onPress={this.setMultipleRoot} />
      </Root>
    );
  }

  componentWillUnmount() {
    unmounted = true;
  }

  setSingleRoot = async () => {
    await this.setRoot();
    logLifecycleEvent({text: `setRoot complete - previous root is${unmounted ? '' : ' not'} unmounted`});
  }

  setMultipleRoot = async () => {
    await this.setRoot();
    await this.setRoot();
  };

  setRoot = async () => await Navigation.setRoot({
    root: {
      stack: {
        id: 'stack',
        children: [{
          component: {
            id: 'component',
            name: Screens.Pushed
          }
        }]
      }
    }
  });
}

module.exports = SetRootScreen;
