npm install --save expo-font
expo install expo-font

npm install --save react-navigation

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

expo install react-native-gesture-handler

navigation.push
props.navigation.goBack();
props.navigation.pop(); only in stack navigator
      props.navigation.popToTop(); back to main 
      props.naviation.replace(); new screen

npm install --save react-native-screens
npm install --save react-navigation-header-buttons
npm install --save @expo/vector-icons


navigationOptions inside of a Navigator

When defining a navigator, you can also add navigationOptions to it:

    const SomeNavigator = createStackNavigator({
        ScreenIdentifier: SomeScreen
    }, {
        navigationOptions: {
            // You can set options here!
            // Please note: This is NOT defaultNavigationOptions!
        }
    });

Don't mistake this for the defaultNavigationOptions which you could also set there (i.e. in the second argument you pass to createWhateverNavigator()).

The navigationOptions you set on the navigator will NOT be used in its screens! That's the difference to defaultNavigationOptions - those option WILL be merged with the screens.

So what's the use of navigationOptions in that place then?

The options become important once you use the navigator itself as a screen in some other navigator - for example if you use some stack navigator (created via createStackNavigator()) in a tab navigator (e.g. created via createBottomTabNavigator()).

In such a case, the navigationOptions configure the "nested navigator" (which is used as a screen) for that "parent navigator". For example, you can use navigationOptions on the nested navigator that's used in a tab navigator to configure the tab icons.



npm install --save react-navigation-material-bottom-tabs
npm install --save react-native-paper


[React Refresher] useEffect() & useCallback()

In case you never heard about useCallback() and useEffect(), I strongly recommend that you dive into some basic React resources (like my "Complete Guide" course) first!

Also check out the official docs:

    React in general: https://reactjs.org/docs/getting-started.html

    useEffect(): https://reactjs.org/docs/hooks-reference.html#useeffect

    useCallback(): https://reactjs.org/docs/hooks-reference.html#usecallback

Short Summary

useEffect()

useEffect() is a so called React Hook (learn more) which allows you to handle side effects in your functional (!) React components.

You can use it to do anything that doesn't directly impact your UI/ JSX code (it might eventually impact it, for example if you're fetching data from some server, but for the current render cycle, it will not).

useEffect() allows you to register a function which executes AFTER the current render cycle.

In the previous lecture, we use that to set new navigation params for this screen (= for this component).

useEffect() runs after every render cycle (i.e. whenever your functional component re-runs/ re-renders), unless you pass a second argument to useEffect(): An array of dependencies of the effect.

With such a dependency array provided, useEffect() will only re-run the function you passed as a first argument, whenever one of the dependencies changed.


useCallback()

useCallback() often is used in conjunction with useEffect() because it allows you to prevent the re-creation of a function. For this, it's important to understand that functions are just objects in JavaScript.

Therefore, if you have a function (A) inside of a function (B), the inner function (=A) will be recreated (i.e. a brand-new object is created) whenever the outer function (B) runs.

That means that in a functional component, any function you define inside of it is re-created whenever the component rebuilds.

Example:

    const MyComponent = props => {
        const innerFunction = () => {
            // a function in a function!
            // this function object (stored in the 'innerFunction' constant) is constantly re-built
            // to be precise: It's re-built when MyComponent is re-built 
            // MyComponent is re-built whenever its 'props' or 'state' changes
        };
    };

Normally, it's no problem, that innerFunction is re-created for every render cycle.

But it becomes a problem if innerFunction is a dependency of useEffect():

    const MyComponent = props => {
        const innerFunction = () => {
            // do something!
        };
     
        useEffect(() => {
            innerFunction();
            // The effect calls innerFunction, hence it should declare it as a dependency
            // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
        }, [innerFunction]);
    };

Why is this code problematic?

The effect re-runs whenever innerFunction changes. As stated, it is re-created whenever MyComponent re-builds.

Because functions are objects and objects are reference types (see: https://academind.com/learn/javascript/reference-vs-primitive-values/), that means that the effect will re-run for every render cycle.

That might still not be a huge problem but it definitely is, if innerFunction does something that causes MyComponent to re-build (i.e. if it either does something that changes the props or the state).

Now, you would have an infinite loop!

useCallback() helps you prevent this.

By wrapping it around a function declaration and defining the dependencies of the function, it ensures that the function is only re-created if its dependencies changed.

Hence the function is NOT re-built on every render cycle anymore => You break out of the infinite loop!
