import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Context as BlogContext, Context } from '../context/BlogContext';
import { Context as ThemeContext } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUsername } from '../hooks/useAPI';

const ShowScreen = ({ navigation }) => {
  const { state: blogState, deleteBlogPost, getBlogPosts } = useContext(
    BlogContext
  ); // access BlogContext object
  const { state: themeState } = useContext(ThemeContext); // access ThemeContext object

  const [username, loading, error, refresh] = useUsername();
  console.log(themeState);
  useEffect(() => {
    if (error) {
      signOut();
    }
  }, [error]);

  // useEffect(() => {
  //   const removeListener = navigation.addListener('focus', () => {
  //     refresh(true);
  //   });
  //   return removeListener;
  //   }, []);

  useEffect(() => {
    getBlogPosts();
    // const listener = navigation.addListener('didFocus', () => {
    const listener = navigation.addListener('focus', () => {
      getBlogPosts();
    });
    return listener;
  }, []);
  // });

  function signOut() {
    AsyncStorage.removeItem('token');
    navigation.navigate('SignIn');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeState.colors.background,
      borderColor: themeState.colors.border,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderTopWidth: 1,
      borderColor: 'gray',
      backgroundColor: themeState.colors.background,
    },
    title: {
      fontSize: 18,
      color: themeState.colors.text,
    },
    icon: {
      fontSize: 30,
      color: themeState.colors.primary,
    },
  });

  console.log('------- blogState below -------');
  console.log(blogState);
  const fullStory1 = blogState
    .map((contents) => contents.content)
    .reduce((accumulate, stories) => accumulate + stories);
  console.log(fullStory1);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, color: 'orange' }}>
          Story 1: The New Depression
        </Text>
        <Text style={styles.title}>{fullStory1}</Text>
      </View>
    </View>
  );
};

export default ShowScreen;

// ------- Original Version -------
// import React, { useContext } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Context as BlogContext } from '../context/BlogContext';
// import { Context as ThemeContext } from '../context/ThemeContext';
// import { EvilIcons } from '@expo/vector-icons';

// const ShowScreen = ({ route }) => {
//   const { state: blogState } = useContext(BlogContext);
//   const { state: themeState } = useContext(ThemeContext);

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: themeState.colors.background,
//       borderColor: themeState.colors.border,
//     },
//     text: {
//       color: themeState.colors.text,
//     },
//   });

//   // const blogPost = blogState.find(
//   //   (blogPost) => blogPost.id === route.params.id
//   // );

//   return (
//     <View style={styles.container}>
//       <Text>This is the Show Screen. Final to show overall story.</Text>
//       {/* <Text style={styles.text}>{blogPost.title}</Text>
//       <Text style={styles.text}>{blogPost.content}</Text> */}
//     </View>
//   );
// };

// export default ShowScreen;
