import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import {
  Layout,
  Text,
  Input,
  Radio,
  RadioGroup,
  Button,
} from '@ui-kitten/components';
import uiControl from 'apps/ui-mobile/src/app/data';
import { User } from '@fitly/shared/meta';
import { Sex } from 'libs/shared/meta/src/lib/enums/sex.enum';
import { UserCard } from '../components/cards/user-card';
import { useNavigation } from '@react-navigation/native';
import { showNotification } from '@fitly/ui-utils';

export const ProfileScreen = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLasttName] = useState<string>();
  const [age, setAge] = useState<string>();
  // RN does not deal with number input
  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [user, setUser] = useState<User>();
  const navigation = useNavigation();

  function setUserData() {
    const user = uiControl.getUser();
    if (user) {
      setUser(user);
      setFirstName(user.name);
      setLasttName(user.surname);
      setAge(user.age.toString());
      setWeight(user.weight.toString());
      setHeight(user.height.toString());
      setSelectedIndex(Object.values(Sex).indexOf(user.sex));
    }
  }
  useEffect(() => {
    setUserData();
    const navigationEvents: (() => void)[] = [];
    navigationEvents.push(
      navigation.addListener('focus', () => {
        setUserData();
      })
    );

    return () => {
      navigationEvents.forEach((t) => t());
    };
  }, []);

  const onSubmit = () => {
    const user: User = {
      name: firstName,
      surname: lastName,
      age: parseInt(age!),
      weight: parseInt(weight!),
      height: parseInt(height!),
      sex: selectedIndex === 0 ? Sex.MALE : Sex.FEMALE,
    };
    setUser(user);
    uiControl.setUser(user);

    showNotification('Data saved');
  };

  return (
    <View>
      <View style={{ marginBottom: 8 }}>
        <UserCard name={`${user?.name} ${user?.surname}`} />
      </View>
      <Input
        placeholder="first name"
        value={firstName}
        onChangeText={(nextValue) => setFirstName(nextValue)}
        style={styles.input}
        size="large"
        label="First name"
      />
      <Input
        placeholder="last name"
        value={lastName}
        onChangeText={(nextValue) => setLasttName(nextValue)}
        style={styles.input}
        size="large"
        label="Last name"
      />
      <View style={styles.formRow}>
        <Input
          placeholder="age"
          keyboardType={'numeric'}
          value={age}
          onChangeText={(nextValue) => setAge(nextValue)}
          style={[styles.input, styles.formColumn]}
          size="large"
          label="Age"
        />
        <Input
          placeholder="weight"
          keyboardType={'numeric'}
          value={weight}
          onChangeText={(nextValue) => setWeight(nextValue)}
          style={[styles.input, styles.formColumn]}
          size="large"
          label="Weight [kg]"
        />
        <Input
          placeholder="height"
          keyboardType={'numeric'}
          value={height}
          onChangeText={(nextValue) => setHeight(nextValue)}
          style={[styles.input, styles.formColumn]}
          size="large"
          label="Height [cm]"
        />
      </View>
      <RadioGroup
        style={styles.radioGroup}
        selectedIndex={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
      >
        <Radio>Male</Radio>
        <Radio>Female</Radio>
      </RadioGroup>

      <Button
        style={styles.button}
        appearance="filled"
        size="large"
        status="primary"
        onPress={onSubmit}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formRow: {
    marginHorizontal: -8,
    flexDirection: 'row',
  },
  formColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  name: {
    textAlign: 'center',
  },
  input: {
    marginTop: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    marginTop: 8,
    marginBottom: 32,
    borderRadius: 999,
  },
});
