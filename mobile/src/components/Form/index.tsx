import React, { useCallback, useState } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import FileSystem from 'expo-file-system';

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import { api } from '../../libs/api';
import { theme } from '../../theme';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';

type FormProps = {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
};

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: FormProps) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const { title, image } = feedbackTypes[feedbackType];

  const handleTakeScreenshot = useCallback(() => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(uri => setScreenshot(uri))
      .catch(console.error);
  }, []);

  const handleRemoveScreenshot = useCallback(() => {
    setScreenshot(null);
  }, []);

  const handleSendFeedback = useCallback(async () => {
    if (isSendingFeedback || comment.trim() === '') return;

    try {
      setIsSendingFeedback(true);
      const screenshotBase64 =
        screenshot &&
        (await FileSystem.readAsStringAsync(screenshot, {
          encoding: 'base64',
        }));

      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      });
      onFeedbackSent();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSendingFeedback(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BorderlessButton onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </BorderlessButton>
        <View style={styles.titleContainer}>
          <Image style={styles.image} source={image} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeScreenshot={handleTakeScreenshot}
          onRemoveScreenshot={handleRemoveScreenshot}
        />
        <Button
          title="Enviar feedback"
          isLoading={isSendingFeedback}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  );
}
