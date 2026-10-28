import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { JVFPRODUTOS } from '../../data/produtos';

export default function JVFProdutos() {
  const JVFrouter = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>
      </View>

      <FlatList
        data={JVFPRODUTOS}
        keyExtractor={(JVFitem) => JVFitem.id}
        contentContainerStyle={styles.list}
        renderItem={({ item: JVFitem }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: JVFitem.imagem }}
              style={styles.thumb}
              resizeMode="cover"
            />

            <View style={styles.info}>
              <View>
                <Text style={styles.nome} numberOfLines={2}>
                  {JVFitem.nome}
                </Text>
                <Text style={styles.descricao} numberOfLines={2}>
                  {JVFitem.descricao}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.preco}>{JVFitem.preco}</Text>
                <TouchableOpacity
                  style={styles.detalhesButton}
                  activeOpacity={0.8}
                  onPress={() =>
                    JVFrouter.push({ pathname: '/produto', params: { id: JVFitem.id } })
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  thumb: {
    width: 140,
    height: 140,
    borderRadius: 14,
    backgroundColor: '#1E293B',
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
  card: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.55)',
  },
  preco: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(249, 115, 22, 0.16)',
    color: '#FDBA74',
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
  detalhesButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  detalhesText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
