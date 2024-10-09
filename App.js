import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, RefreshControl} from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserAvatar from 'react-native-user-avatar';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const addOneResult = () => {
    axios
      .get("https://random-data-api.com/api/v2/users?size=1")
      .then((response) => {
        setComments([response.data, ...comments]);
      })
      .catch((e) => {
        console.log("Error fetching data: ", e);
      });
  }

  const fetch10Results = () => {
    axios
      .get("https://random-data-api.com/api/v2/users?size=10")
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        console.log("Error fetching data: ", e);
      });
  }

  useEffect(() => {
    fetch10Results();
  });

  // Item renderer for FlatList
  const renderItem = ({ item }) => (
    <View style={{borderBottomWidth:2, borderRadius:10, borderColor:"black", marginBottom: 10, flexDirection:"row", justifyContent: "space-between"}}>
      <View style={{justifyContent: "center"}}>
        <Text style={styles.name}>{item.first_name}</Text>
        <Text style={styles.name}>{item.last_name}</Text>
      </View>
      <View>
        <UserAvatar size={100} name="Avishay Bar" src={item.avatar} />
        
      </View>
    </View>
  );

  // Key extractor for FlatList
  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetch10Results} />
          }
          data={comments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={addOneResult}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});