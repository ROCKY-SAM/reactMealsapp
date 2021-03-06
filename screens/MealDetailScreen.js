import React,{useEffect,useCallback} from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import {useSelector,useDispatch} from 'react-redux';
//import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

import {toggleFavorite} from '../store/actions/meals';
const ListItem = props =>{
return <View style={styles.listItem}><DefaultText>{props.children}</DefaultText></View>
};


const MealDetailScreen = props => {

  const availableMeals = useSelector(state=>state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const favoriteMeals = useSelector(state =>state.meals.favoriteMeals.some(meal=> meal.id ===mealId));
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();


  const toggleFavoriteHandler = useCallback(() =>{
    dispatch(toggleFavorite(mealId));}
  ,[dispatch,mealId]);


  useEffect(()=>{
  //  props.navigation.setParams({mealTitle:selectedMeal.title});
  props.navigation.setParams({toggleFav:toggleFavoriteHandler});
  },[toggleFavoriteHandler]);

  useEffect(()=>{
 
    props.navigation.setParams({isFav : favoriteMeals});
    },[favoriteMeals]);


  return (<ScrollView>
    <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
    <View style={styles.detail}>
      <DefaultText>{selectedMeal.duration}m</DefaultText>
      <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
      <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
    </View>
    <Text style={styles.title}>Ingredients</Text>
  {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
    <Text style={styles.title}>Steps</Text>
    {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}

  </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {

  //const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  // const selectedMeal = mealTitle.find(meal => meal.id === mealId);
  const isfavorite  = navigationData.navigation.getParam('isFav');
  return {
    headerTitle:mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isfavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  }, image: {
    width: '100%',
    height: 200
  }, detail: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },listItem:{
    marginVertical:10,
    marginHorizontal:20,
    borderColor:'#ccc',
    borderWidth:1,
    padding:10
  }
});

export default MealDetailScreen;
