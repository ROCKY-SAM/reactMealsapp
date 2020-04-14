import React, { useState,useEffect ,useCallback} from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';
const FilterSwitch = props => {
  return (<View style={styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch
      trackColor={{ true: Colors.primaryColor }}
      thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
      value={props.state} onValueChange={props.onChange} />
  </View>);
};

const FiltersScreen = props => {

const {navigation} =props;

  const [isGultenFree, setIsGultenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

const dispatch = useDispatch();

  const saveFilters =useCallback(() =>{
    const appliedFilters ={
      glutenFree:isGultenFree,
      lactoseFree:isLactoseFree,
      vegan:isVegan,
      vegetarian:isVegetarian
    }
    dispatch(setFilters(appliedFilters));
  },[isGultenFree,isLactoseFree,isVegan,isVegetarian,dispatch]);


  useEffect(()=>{
    navigation.setParams({save:saveFilters});
  },[saveFilters]);


  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch onChange={newValue => setIsGultenFree(newValue)} state={isGultenFree} label='Gluten-Free' />
      <FilterSwitch onChange={newValue => setIsLactoseFree(newValue)} state={isLactoseFree} label='Lactose-Free' />
      <FilterSwitch onChange={newValue => setIsVegan(newValue)} state={isVegan} label='Vegan' />
      <FilterSwitch onChange={newValue => setIsVegetarian(newValue)} state={isVegetarian} label='Vegetarian' />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={ 
        navData.navigation.getParam('save') }
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  }, title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  }, filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical:15
  }
});

export default FiltersScreen;
