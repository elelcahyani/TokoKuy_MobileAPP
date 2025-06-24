import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Grid2x2 as Grid, List, Star, MapPin, Heart, ShoppingBag } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { categories, products } from '@/data/products';

export default function CategoriesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating' | 'popular'>('default');

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category as string);
    }
  }, [params.category]);

  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = products.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered = [...filtered].sort((a, b) => {
          const aSold = parseInt(a.sold.replace('k', '000').replace('.', ''));
          const bSold = parseInt(b.sold.replace('k', '000').replace('.', ''));
          return bSold - aSold;
        });
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const renderGridProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.gridProductCard}
      onPress={() => handleProductPress(item.id)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.gridProductImage} />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            size={14} 
            color={isFavorite(item.id) ? "#EF4444" : "#9CA3AF"}
            fill={isFavorite(item.id) ? "#EF4444" : "none"}
          />
        </TouchableOpacity>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}%</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
          )}
        </View>
        <View style={styles.productMeta}>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.sold}>{item.sold}</Text>
        </View>
        <View style={styles.locationContainer}>
          <MapPin size={12} color="#9CA3AF" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <ShoppingBag size={12} color="#10B981" />
          <Text style={styles.addToCartText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderListProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.listProductCard}
      onPress={() => handleProductPress(item.id)}
    >
      <View style={styles.listImageContainer}>
        <Image source={{ uri: item.image }} style={styles.listProductImage} />
        <TouchableOpacity 
          style={styles.listFavoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart 
            size={16} 
            color={isFavorite(item.id) ? "#EF4444" : "#9CA3AF"}
            fill={isFavorite(item.id) ? "#EF4444" : "none"}
          />
        </TouchableOpacity>
        {item.discount && (
          <View style={styles.listDiscountBadge}>
            <Text style={styles.discountText}>{item.discount}%</Text>
          </View>
        )}
      </View>
      <View style={styles.listProductInfo}>
        <Text style={styles.listProductName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.listPriceContainer}>
          <Text style={styles.listPrice}>{formatPrice(item.price)}</Text>
          {item.originalPrice && (
            <Text style={styles.listOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
          )}
        </View>
        <View style={styles.listProductMeta}>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.sold}>• {item.sold} sold</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <MapPin size={12} color="#9CA3AF" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <TouchableOpacity 
          style={styles.listAddToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <ShoppingBag size={14} color="#10B981" />
          <Text style={styles.listAddToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/search')}
          >
            <Search size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={20} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <List size={20} color="#374151" />
            ) : (
              <Grid size={20} color="#374151" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Categories List */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.categoryChipTextActive
                ]}>
                  {category.name}
                </Text>
                <Text style={[
                  styles.categoryCount,
                  selectedCategory === category.id && styles.categoryCountActive
                ]}>
                  {category.count}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortScrollContainer}
          >
            {[
              { key: 'default', label: 'Default' },
              { key: 'price-low', label: 'Price: Low to High' },
              { key: 'price-high', label: 'Price: High to Low' },
              { key: 'rating', label: 'Highest Rating' },
              { key: 'popular', label: 'Most Popular' },
            ].map((sort) => (
              <TouchableOpacity
                key={sort.key}
                style={[
                  styles.sortChip,
                  sortBy === sort.key && styles.sortChipActive
                ]}
                onPress={() => setSortBy(sort.key as any)}
              >
                <Text style={[
                  styles.sortChipText,
                  sortBy === sort.key && styles.sortChipTextActive
                ]}>
                  {sort.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={styles.productsContainer}>
          <View style={styles.productsHeader}>
            <Text style={styles.productsCount}>
              {filteredProducts.length} products found
            </Text>
          </View>
          
          <FlatList
            data={filteredProducts}
            renderItem={viewMode === 'grid' ? renderGridProduct : renderListProduct}
            keyExtractor={(item) => item.id}
            numColumns={viewMode === 'grid' ? 2 : 1}
            key={viewMode}
            columnWrapperStyle={viewMode === 'grid' ? styles.productRow : undefined}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsListContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#10B981',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginRight: 6,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  categoryCountActive: {
    color: '#FFFFFF',
  },
  sortContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sortScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sortChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  sortChipActive: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  sortChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  sortChipTextActive: {
    color: '#10B981',
  },
  productsContainer: {
    flex: 1,
    paddingTop: 16,
  },
  productsHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  productsCount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  productsListContainer: {
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  gridProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImageContainer: {
    position: 'relative',
  },
  listImageContainer: {
    position: 'relative',
    width: 120,
  },
  gridProductImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  listProductImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listFavoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  listDiscountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  productInfo: {
    padding: 12,
  },
  listProductInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 20,
  },
  listProductName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginRight: 8,
  },
  listPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  listOriginalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listProductMeta: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  sold: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    marginLeft: 4,
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingVertical: 6,
    borderRadius: 6,
  },
  addToCartText: {
    color: '#10B981',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  listAddToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingVertical: 8,
    borderRadius: 8,
  },
  listAddToCartText: {
    color: '#10B981',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
});