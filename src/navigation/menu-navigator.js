import { StackNavigator } from 'react-navigation';
import Menu from '../components/Menu';
import Appointments from '../components/Appointments';
import AccountDetails from '../components/AccountDetails';

export const MenuNavigator = StackNavigator({
    Menu: {
        screen: Menu
    },
    AccountDetails: {
        screen: AccountDetails
    },
    Appointments: {
        screen: Appointments
    }
});

export const mapNavigation = {
    'Account Details':'AccountDetails',
    'Appointments':'Appointments'
}

export default MenuNavigator;