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

const IndexScreen = ({ navigation }) => {
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

  console.log(blogState);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, color: 'orange' }}>
          Story 1: The New Depression
        </Text>
        <FlatList
          data={blogState}
          keyExtractor={(blogPost) => blogPost.id.toString()} // where blogPost is each element in blogPosts
          renderItem={({ item }) => {
            // item refers to individual blogPost element object
            return (
              <TouchableOpacity
                // onPress={() => navigation.navigate('Show', { id: item.id })}
                onPress={() => navigation.navigate('Edit', { id: item.id })}
              >
                <View style={styles.row}>
                  <Text style={styles.title}>
                    {/* {item.title} - {item.id} */}
                    {item.content}
                  </Text>
                  {/* <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                    <EvilIcons
                      name='trash'
                      size={24}
                      color='black'
                      style={styles.icon}
                    />
                  </TouchableOpacity> */}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/* <TouchableOpacity onPress={signOut} style={{ alignSelf: 'center' }}>
          <Text>Sign Out</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default IndexScreen;
