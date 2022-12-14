import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Camera, Trash } from 'phosphor-react-native';

import { theme } from '../../theme';
import { styles } from './styles';

type ScreenshotButtonProps = {
  screenshot: string | null;
  onTakeScreenshot: () => void;
  onRemoveScreenshot: () => void;
};

export function ScreenshotButton({
  screenshot,
  onTakeScreenshot,
  onRemoveScreenshot,
}: ScreenshotButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveScreenshot : onTakeScreenshot}
    >
      {screenshot ? (
        <View>
          <Image style={styles.image} source={{ uri: screenshot }} />
          <Trash
            size={22}
            weight="fill"
            color={theme.colors.text_secondary}
            style={styles.removeIcon}
          />
        </View>
      ) : (
        <Camera size={24} weight="bold" color={theme.colors.text_secondary} />
      )}
    </TouchableOpacity>
  );
}
