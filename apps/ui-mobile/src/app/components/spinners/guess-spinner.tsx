import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ActivityType } from '@fitly/shared/meta';
import { VariousIcons } from '../../assets/common/various-icons';
import { STATUS } from '../../screens/guess-screen';

interface Props {
  activity?: ActivityType;
  status: STATUS;
  setStatus: React.Dispatch<React.SetStateAction<STATUS>>
}

export const GuessSpinner: React.FC<Props> = ({ activity, status, setStatus }) => {
  const theme = useTheme();

  let icon: number;
  if (status === STATUS.IDLE){
    icon = VariousIcons['play']
  } else if (status === STATUS.FOUND && activity){
    icon = VariousIcons['play']
  } else {
    icon = VariousIcons['questionMark']
  }

  const handlePress = () => {
    if (status === STATUS.IDLE){
      setStatus(STATUS.SEARCHING)
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, { borderColor: theme['color-info-400'] }]}>
      <Image
        style={styles.image}
        source={icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 20,
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
  },
  text: {
    fontSize: 64,
  },
  image: {
    width: 120,
    height: 120,
  },
});
