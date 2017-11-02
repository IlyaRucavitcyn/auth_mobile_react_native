import { StackNavigator } from 'react-navigation';
import Menu, { menuItemNames } from '../components/Menu';
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

export const mapNavigationNaming = {
    [menuItemNames.ACCOUNT_DETAILS]: AccountDetails.name,
    [menuItemNames.APPOINTMENTS]: Appointments.name
}

export default MenuNavigator;