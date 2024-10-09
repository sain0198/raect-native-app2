import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("https://random-data-api.com/api/v2/users?size=10")
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  });

  // Item renderer for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.name}>{item.first_name}</Text>
      <Text style={styles.name}>{item.last_name}</Text>
      <Text style={styles.email}>{item.avatar}</Text>
      <Text style={styles.body}>{item.uid}</Text>
    </View>
  );

  // Key extractor for FlatList
  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});