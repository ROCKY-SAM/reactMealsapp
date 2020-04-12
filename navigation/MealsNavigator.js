import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Platform, Modal} from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';


import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
},{
  mode:'Modal',
  defaultNavigationOptions:{
      headerStyle:{
        backgroundColor:Platform.OS === 'android' ? Colors.primaryColor :''
      },
      headerTintColor:Platform.OS === 'android' ? 'white' :Colors.primaryColor
  }
});

export default createAppContainer(MealsNavigator);
