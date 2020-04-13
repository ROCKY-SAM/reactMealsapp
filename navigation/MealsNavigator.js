import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Platform, Modal } from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const defaultStackNavOptions={
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle:'A Screen'

}


const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
}, {
  mode: 'Modal',
  defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
  Favorites:FavoritesScreen,
  MealDetail:MealDetailScreen
},{  defaultNavigationOptions: defaultStackNavOptions});


const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, navigationOptions: {
      tabBarLabel: 'Meals',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor:Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavNavigator, 
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
      },  tabBarColor:Colors.accentColor
    }
  }
};

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(
  tabScreenConfig,{
    activeColor:'white',
    shifting:true,
    barStyle:{
      backgroundColor:'red'
    }
  })
  : createBottomTabNavigator(
    tabScreenConfig, {
    tabBarOptions: {
      activeTintColor: Colors.accentColor
    }
  });
export default createAppContainer(MealsFavTabNavigator);
