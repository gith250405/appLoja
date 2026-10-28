import React, { useState } from 'react';
import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity,KeyboardAvoidingView,
        ScrollView,Platform,Alert,useWindowDimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';

const JVFEMAIL_TESTE = 'teste@corneta.com';
const JVFSENHA_TESTE = '123456';

export default function TelaLogin() {
  const JVFrouter = useRouter();
  const { entrar: JVFentrar } = useApp();
  const { height: JVFheight } = useWindowDimensions();
  const [JVFemail, JVFsetEmail] = useState<string>('');
  const [JVFsenha, JVFsetSenha] = useState<string>('');

  const JVFhandleLogin = () => {
    const JVFemailLimpo = JVFemail.trim();

    if (!JVFemailLimpo || !JVFsenha) {
      Alert.alert('Atenção', 'Preencha e-mail e senha para continuar.');
      return;
    }

    if (JVFemailLimpo === JVFEMAIL_TESTE && JVFsenha === JVFSENHA_TESTE) {
      JVFentrar(JVFemailLimpo);
      JVFrouter.replace('/tabs/produtos');
    } else {
      Alert.alert('Atenção', 'E-mail ou senha incorretos.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.imageContainer, { height: JVFheight * 0.4 }]}>
            <Image
              source={require('../../assets/logo_carro.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.bottomCard}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.brandTitle}>Corneta e Cia</Text>
              <Text style={styles.brandSubtitle}>Faça login para continuar</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.icon}>✉️</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#64748B"
                  value={JVFemail}
                  onChangeText={JVFsetEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.icon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="#64748B"
                  secureTextEntry
                  value={JVFsenha}
                  onChangeText={JVFsetSenha}
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="done"
                  onSubmitEditing={JVFhandleLogin}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={JVFhandleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 24,
    justifyContent: 'space-around',
    gap: 24,
  },
  headerTitleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    letterSpacing: 1,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  icon: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#1D4ED8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
