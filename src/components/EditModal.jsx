import React, { useState } from "react";
import {
  Button,
  Modal,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onS }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Ошибка!",
        `Минимальная длина названия 3 символа. Сейчас ${
          title.trim().length
        } символов.`
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Введите название"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
              Отменить
            </AppButton>
          </View>
          <View style={styles.button}>
            <AppButton onPress={saveHandler}>Сохранить</AppButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    width: "80%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
  },
});
