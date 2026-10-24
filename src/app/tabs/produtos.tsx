import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PRODUTOS } from '../../data/produtos';

export default function Produtos() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>
      </View>

      <FlatList
        data={PRODUTOS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Miniatura (50% da imagem da tela de detalhes) */}
            <Image
              source={{ uri: item.imagem }}
              style={styles.thumb}
              resizeMode="cover"
            />

            <View style={styles.info}>
              <View>
                <Text style={styles.nome} numberOfLines={2}>
                  {item.nome}
                </Text>
                <Text style={styles.descricao} numberOfLines={2}>
                  {item.descricao}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.preco}>{item.preco}</Text>
                <TouchableOpacity
                  style={styles.detalhesButton}
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push({ pathname: '/produto', params: { id: item.id } })
                  }
                >
                  <Text style={styles.detalhesText}>Detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  list: { paddingHorizontal: 24, paddingBottom: 24, gap: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  thumb: {
    width: 140,
    height: 140,
    borderRadius: 14,
    backgroundColor: '#1E293B', // aparece enquanto a imagem carrega
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nome: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  descricao: { color: '#94A3B8', fontSize: 13, marginTop: 4 },
  cardFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 10,
  },
  preco: { color: '#3B82F6', fontSize: 16, fontWeight: 'bold' },
  detalhesButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1D4ED8',
  },
  detalhesText: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
});