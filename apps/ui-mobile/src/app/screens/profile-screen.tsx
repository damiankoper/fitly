import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Input, Radio, RadioGroup, Button } from '@ui-kitten/components';
import { Sex, User } from '@fitly/shared/meta';
import { UserCard } from '../components/cards/user-card';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { showNotification } from '@fitly/ui-utils';
import uiControl from '../data';

export const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState<User>(uiControl.getUser());
  const [firstName, setFirstName] = useState<string>(user.name);
  const [lastName, setLasttName] = useState<string>(user.surname);
  const [age, setAge] = useState<string>(user.age.toFixed(0));
  const [weight, setWeight] = useState<string>(user.weight.toFixed(0));
  const [height, setHeight] = useState<string>(user.height.toFixed(0));
  const [selectedIndex, setSelectedIndex] = useState<number>(
    Object.values(Sex).indexOf(user.sex)
  );

  function setUserData() {
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
    if (isFocused) setUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onSubmit = () => {
    const user: User = {
      name: firstName,
      surname: lastName,
      age: +(age || 0),
      weight: +(weight || 0),
      height: +(height || 0),
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
