import React from 'react';
import { createStackNavigator,createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Platform, Modal} from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {Ionicons} from '@expo/vector-icons';
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


const MealsFavTabNavigator = createBottomTabNavigator(
  {
    Meals:{screen:MealsNavigator,navigationOptions:{
      tabBarLabel:'Meals',
      tabBarIcon:(tabInfo)=>{
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>;
      }
    }},
    Favorites:{screen:FavoritesScreen,navigationOptions:{
      tabBarIcon:(tabInfo)=>{
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>;
      }
    }}
  },{
    tabBarOptions:{
      activeTintColor:Colors.accentColor
    }
  }
); 
export default createAppContainer(MealsFavTabNavigator);
