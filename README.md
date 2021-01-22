Learning react native

export default function App() {
  const [name, setName] = useState("Yulia")
  const clickHandler = () => {
    setName("Olga");
  }

<View style={styles.container}>
      <Text>My name is {name}</Text>
      <View style={styles.test}>
        <Button title="update name"  onPress = {clickHandler}/>
      </View>
      <Text> Enter name:</Text>
      <TextInput 
          style={styles.input}
          placehodle= "Enter your name"
          onChangeText={(val) => setName(val)}
          keyboardType='numeric'/>
      <StatusBar style="auto" />
    </View>