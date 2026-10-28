import {StyleSheet,Text,View,Image,ScrollView,TouchableOpacity,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { JVFgetProdutoPorId } from '../data/produtos';
import { useJVFApp } from '../context/AppContext';

export default function JVFProduto() {
  const JVFrouter = useRouter();
  const { id: JVFid } = useLocalSearchParams<{ id: string }>();
  const JVFproduto = JVFgetProdutoPorId(JVFid);
  const { isFavorito: JVFisFavorito, toggleFavorito: JVFtoggleFavorito } = useJVFApp();

  const JVFvoltar = () => {
    if (JVFrouter.canGoBack()) {
      JVFrouter.back();
    } else {
      JVFrouter.replace('../produtos');
    }
  };

  const JVFbotaoVoltar = (
    <TouchableOpacity onPress={JVFvoltar} activeOpacity={0.7} style={styles.backButton}>
      <Text style={styles.backText}>← Voltar</Text>
    </TouchableOpacity>
  );

  if (!JVFproduto) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>{JVFbotaoVoltar}</View>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Produto não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const JVFfavorito = JVFisFavorito(JVFproduto.id);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        {JVFbotaoVoltar}
        <TouchableOpacity
          onPress={() => JVFtoggleFavorito(JVFproduto.id)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={
            JVFfavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
        >
          <Ionicons
            name={JVFfavorito ? 'heart' : 'heart-outline'}
            size={28}
            color={JVFfavorito ? '#EF4444' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: JVFproduto.imagem }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.nome}>{JVFproduto.nome}</Text>
          <Text style={styles.preco}>{JVFproduto.preco}</Text>

          <Text style={styles.sectionLabel}>Descrição</Text>
          <Text style={styles.descricao}>{JVFproduto.descricao}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  backText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 20,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    borderRadius: 24,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#334155',
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  preco: {
    color: '#3B82F6',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  descricao: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  buyButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1D4ED8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: '#94A3B8',
    fontSize: 16,
  },
});
