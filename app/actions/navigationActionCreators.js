import Marty from 'marty';
import NavigationConstants from '../constants/navigationConstants';

class NavigationActionCreators extends Marty.ActionCreators {
    navigateHome() {
        //console.log(' navigateHome !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.navigateTo('home');
    }
    navigateToLogin() {
        //console.log(' navigateToLogin !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.navigateTo('login');
    }

    navigateToVerify(username) {
        //console.log(' navigateToVerification page !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.navigateTo('verify', {username:username, verificationId:'id'});
    }

    changeRoute(state) {
        //console.log(' changeRoute !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! '+JSON.stringify(state));

        this.dispatch(NavigationConstants.CHANGE_ROUTE, state);
        if (state.path === '/logout') {
            this.app.loginActionCreators.logout();
        }

    }

    reload(){
        console.log('Reloading');
        this.app.router.refresh();
    }

    navigateTo(route, params={}, delay=200) {
        setTimeout(()=>{
            this.app.router.transitionTo(route, params);
        },delay);
        //console.log('navigate to', route, JSON.stringify(params));
    }
}


export default NavigationActionCreators;
