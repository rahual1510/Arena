/* eslint-disable prettier/prettier */
import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName) {
  _navigator.dispatch(StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })],
  })
  );
}

function toggleDrawer() {
  _navigator.dispatch(
    DrawerActions.toggleDrawer()
  );
}

function closeDrawer() {
  _navigator.dispatch(
    DrawerActions.closeDrawer()
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  reset,
  toggleDrawer,
  closeDrawer,
};
