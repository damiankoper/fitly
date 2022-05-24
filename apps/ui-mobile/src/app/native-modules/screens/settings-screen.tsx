import React, { useEffect, useState } from 'react';
import {
  Layout,
  Toggle,
  Text,
  Divider,
  Button,
  Modal,
  Card,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { BluetoothButton } from '../../components/buttons/bluetooth-button';
import { commonStyles } from '../../assets/common/styles';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../interfaces/BottomTabParamList';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/root.reducer';
import uiControl from 'apps/ui-mobile/data';

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return { checked, onChange: onCheckedChange };
};

type NavProps = BottomTabScreenProps<BottomTabParamList, 'Settings'>;
export const SettingScreen: React.FC<NavProps> = ({ navigation }) => {
  const isConnectedToDevice = useSelector((state: RootState) =>
    Boolean(state.app.connectedDevice)
  );
  const controlToggleState = useToggleState();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleClearDataClick = () => {
    setModalVisible(true);
  };

  const handleDeleteClick = () => {
    setModalVisible(false);
    uiControl.resetUser();
  };

  return (
    <Layout style={styles.container}>
      <View style={[commonStyles.defaultBorder, styles.controlContainer]}>
        <Text style={styles.modeText}>Dark mode</Text>
        <Toggle status="primary" {...controlToggleState} />
      </View>
      <Divider />

      <View style={styles.buttonColumn}>
        <View>
          <Button
            style={styles.button}
            size="giant"
            appearance="outline"
            onPress={() => navigation.navigate('Profile')}
          >
            Change data
          </Button>
          <Button
            style={styles.button}
            size="giant"
            status="warning"
            appearance="outline"
            onPress={handleClearDataClick}
          >
            Clear data
          </Button>
          <Button
            style={styles.button}
            size="giant"
            status="basic"
            appearance="outline"
            onPress={() => navigation.navigate('Service')}
          >
            Service mode
          </Button>
        </View>

        {isConnectedToDevice || <BluetoothButton navigation={navigation} />}
      </View>

      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Card disabled={true}>
          <Text>Are you sure that you want to delete all data?</Text>
          <View style={styles.buttonRow}>
            <Button
              appearance="outline"
              status="info"
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              No
            </Button>
            <Button
              appearance="outline"
              status="danger"
              style={styles.modalButton}
              onPress={handleDeleteClick}
            >
              Yes
            </Button>
          </View>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlContainer: {
    borderRadius: 4,
    padding: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeText: {
    fontWeight: '700',
    fontSize: 20,
  },
  buttonColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonRow: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
	modalButton: {
		width: 120
	},
  button: {
    marginTop: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
