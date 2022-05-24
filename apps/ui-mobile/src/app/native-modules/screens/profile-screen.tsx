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
import uiControl from 'apps/ui-mobile/data';
import { User } from '@fitly/shared/meta';
import { Sex } from 'libs/shared/meta/src/lib/enums/sex.enum';

export const ProfileScreen = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLasttName] = useState<string>();
  const [age, setAge] = useState<string>();
  // RN does not deal with number input
  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    let user = uiControl.getUser();
    setUser(user!);
    if (user) {
      setFirstName(user.name);
      setLasttName(user.surname);
      setAge(user.age.toString());
      setWeight(user.weight.toString());
      setHeight(user.height.toString());
      setSelectedIndex(Object.values(Sex).indexOf(user.sex));
    }
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
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.formColumn}>
        <View>
          <Text category="h1" style={styles.name}>
            {`${user?.name} ${user?.surname}`}
          </Text>
          <Input
            placeholder="first name"
            value={firstName}
            onChangeText={(nextValue) => setFirstName(nextValue)}
            style={styles.input}
            size="large"
          />
          <Input
            placeholder="last name"
            value={lastName}
            onChangeText={(nextValue) => setLasttName(nextValue)}
            style={styles.input}
            size="large"
          />
          <Input
            placeholder="age"
            keyboardType={'numeric'}
            value={age}
            onChangeText={(nextValue) => setAge(nextValue)}
            style={styles.input}
            size="large"
          />
          <Input
            placeholder="weight"
            keyboardType={'numeric'}
            value={weight}
            onChangeText={(nextValue) => setWeight(nextValue)}
            style={styles.input}
            size="large"
          />
          <Input
            placeholder="height"
            keyboardType={'numeric'}
            value={height}
            onChangeText={(nextValue) => setHeight(nextValue)}
            style={styles.input}
            size="large"
          />
          <RadioGroup
            style={styles.radioGroup}
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
          >
            <Radio>Male</Radio>
            <Radio>Female</Radio>
          </RadioGroup>
        </View>
      </View>
      <Button appearance="outline" status="primary" onPress={onSubmit}>
        Save
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  formColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    textAlign: 'center',
  },
  input: {
    marginTop: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    marginTop: 16,
  },
});
