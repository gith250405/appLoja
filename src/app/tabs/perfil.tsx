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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PRODUTOS } from '../../data/produtos';
import { useApp } from '../../context/AppContext';

// Foto de exemplo: troque pela URL da foto real do usuário
const FOTO_PERFIL = 'https://picsum.photos/seed/perfil/300/300';

export default function Perfil() {
  const router = useRouter();
  const { usuario, favoritos, sair } = useApp();

  const produtosFavoritos = PRODUTOS.filter((p) => favoritos.includes(p.id));

  const handleSair = () => {
    sair();
    router.replace('/login');
  };

  const cabecalho = (
    <View>
      <View style={styles.perfilCard}>
        <Image source={{ uri: FOTO_PERFIL }} style={styles.avatar} />
        <Text style={styles.nome}>@{usuario?.nome ?? 'visitante'}</Text>
        {usuario?.email ? <Text style={styles.email}>{usuario.email}</Text> : null}

        <TouchableOpacity
          style={styles.sairButton}
          onPress={handleSair}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color="#F87171" />
          <Text style={styles.sairText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Produtos favoritos ({produtosFavoritos.length})
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={produtosFavoritos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={cabecalho}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Você ainda não favoritou nenhum produto. Toque no coração na página
            do produto para salvá-lo aqui.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.favItem}
            activeOpacity={0.8}
            onPress={() =>
              router.push({ pathname: '/produto', params: { id: item.id } })
            }
          >
            <Image source={{ uri: item.imagem }} style={styles.favThumb} />
            <View style={styles.favInfo}>
              <Text style={styles.favNome} numberOfLines={2}>
                {item.nome}
              </Text>
              <Text style={styles.favPreco}>{item.preco}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  list: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24, gap: 12 },
  perfilCard: {
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#3B82F6',
    backgroundColor: '#1E293B',
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 14,
  },
  email: { color: '#94A3B8', fontSize: 14, marginTop: 4 },
  sairButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  sairText: { color: '#F87171', fontSize: 15, fontWeight: 'bold' },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vazio: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingVertical: 24,
  },
  favItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  favThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#1E293B',
  },
  favInfo: { flex: 1 },
  favNome: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  favPreco: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
});