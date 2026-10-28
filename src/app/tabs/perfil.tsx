import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { JVFPRODUTOS } from '../../data/produtos';
import { useJVFApp } from '../../context/AppContext';

const JVFFOTO_PERFIL = '../../assets/demo_van.jpg';

export default function JVFPerfil() {
  const JVFrouter = useRouter();
  const {
    usuario: JVFusuario,
    favoritos: JVFfavoritos,
    sair: JVFsair,
  } = useJVFApp();

  const JVFprodutosFavoritos = JVFPRODUTOS.filter((JVFp) =>
    JVFfavoritos.includes(JVFp.id)
  );

  const JVFhandleSair = () => {
    JVFsair();
    JVFrouter.replace('/login');
  };

  const JVFcabecalho = (
    <View>
      <View style={styles.perfilCard}>
        <Image source={{ uri: JVFFOTO_PERFIL }} style={styles.avatar} />
        <Text style={styles.nome}>@{JVFusuario?.nome ?? 'visitante'}</Text>
        {JVFusuario?.email ? <Text style={styles.email}>{JVFusuario.email}</Text> : null}

        <TouchableOpacity
          style={styles.sairButton}
          onPress={JVFhandleSair}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color="#F87171" />
          <Text style={styles.sairText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Produtos favoritos ({JVFprodutosFavoritos.length})
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={JVFprodutosFavoritos}
        keyExtractor={(JVFitem) => JVFitem.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={JVFcabecalho}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Você ainda não favoritou nenhum produto. Toque no coração na página
            do produto para salvá-lo aqui.
          </Text>
        }
        renderItem={({ item: JVFitem }) => (
          <TouchableOpacity
            style={styles.favItem}
            activeOpacity={0.8}
            onPress={() =>
              JVFrouter.push({ pathname: '/produto', params: { id: JVFitem.id } })
            }
          >
            <Image source={{ uri: JVFitem.imagem }} style={styles.favThumb} />
            <View style={styles.favInfo}>
              <Text style={styles.favNome} numberOfLines={2}>
                {JVFitem.nome}
              </Text>
              <Text style={styles.favPreco}>{JVFitem.preco}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748B" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  list: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
  },
  perfilCard: {
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#554c33',
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
  email: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
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
  sairText: {
    color: '#F87171',
    fontSize: 15,
    fontWeight: 'bold',
  },
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
  favInfo: {
    flex: 1,
  },
  favNome: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  favPreco: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
