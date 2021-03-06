import React, { useState } from 'react';
import {
  Layout,
  Text,
  Divider,
  Button,
  Modal,
  Card,
  useTheme,
} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../assets/common/styles';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../interfaces/BottomTabParamList';
import uiControl from '../data';

type NavProps = BottomTabScreenProps<BottomTabParamList, 'Settings'>;
export const SettingScreen: React.FC<NavProps> = ({ navigation }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleClearDataClick = () => {
    setModalVisible(true);
  };

  const handleDeleteClick = () => {
    setModalVisible(false);
    uiControl.reset();
  };

  return (
    <Layout style={styles.container}>
      <Text style={commonStyles.title}>Settings</Text>
      <View
        style={[
          { backgroundColor: theme['color-basic-200'] },
          styles.menuSection,
          commonStyles.defaultBorder,
        ]}
      >
        <TouchableOpacity
          style={{ marginVertical: 12 }}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.menuItemTitle}>User profile</Text>
          <Text style={styles.menuItemSubtitle}>
            Fill data to get accurate activity statistics
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{ marginVertical: 12 }}
          onPress={handleClearDataClick}
        >
          <Text style={styles.menuItemTitle}>Reset data</Text>
          <Text style={styles.menuItemSubtitle}>
            Restore default user data and delete exercise history
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          { backgroundColor: theme['color-basic-200'] },
          styles.menuSection,
          commonStyles.defaultBorder,
        ]}
      >
        <TouchableOpacity
          style={{ marginVertical: 12 }}
          onPress={() => navigation.navigate('BluetoothConnection')}
        >
          <Text style={styles.menuItemTitle}>Bluetooth connection</Text>
          <Text style={styles.menuItemSubtitle}>Connect with the armband</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginVertical: 12 }}
          onPress={() => navigation.navigate('Service')}
        >
          <Text style={styles.menuItemTitle}>Service mode</Text>
          <Text style={styles.menuItemSubtitle}>Collect data for ML</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        style={{ maxWidth: '90%' }}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Card disabled style={[commonStyles.defaultBorder]}>
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
              appearance="filled"
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
  container: {},
  menuSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
  },
  menuItemTitle: {
    fontFamily: 'Roboto-Bold',
    lineHeight: 20,
    fontSize: 20,
  },
  menuItemSubtitle: {},
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
    marginTop: 16,
    marginHorizontal: -8,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 999,
  },
  button: {
    marginTop: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
