import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard , Alert} from 'react-native';

import Cards from '../components/Cards';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NummberContainer from '../components/NumberContainer';
import GameScreen from '../Screens/GameScreen';



const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber]=useState();
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));

    };
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const ChosenNumber = parseInt(enteredValue);
        if (isNaN(ChosenNumber) || ChosenNumber <= 0 || ChosenNumber > 99) {
            Alert.alert('Invalid Input','please enter the number between 0-99',[{text:'okey' , style:'destructive',onPress:resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(ChosenNumber);
        setEnteredValue('');
       
    };

    let confirmOutput;
    if (confirmed) {
        confirmOutput =<Cards style={styles.summaryContainer}>
        <Text>the choosen number is</Text>
      
    <NummberContainer>{selectedNumber}</NummberContainer>
        <Button title="Start Game" onPress={()=>props.onStartGame(selectedNumber)}/>
        </Cards>
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <Text> start a new Game</Text>
                <Cards style={styles.InputContainer}>
                    <Text> select a number </Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCaptalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}

                    />

                    <View style={styles.ButtonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={confirmInputHandler}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                </Cards>
                {confirmOutput}
            </View>
        </TouchableWithoutFeedback>



    );


};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    InputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',

    },
    ButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    }
    ,
    input: {
        width: 30,
        textAlign: 'center',
    },
    summaryContainer:{
        marginTop:30,
    }

});


export default StartGameScreen; 