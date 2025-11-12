import React, { useState } from 'react';
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
import { Search, Filter, Grid2x2 as Grid, List, Star, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const categories = [
  { id: 'all', name: 'All Categories', count: '10k+' },
  { id: 'electronics', name: 'Electronics', count: '2.5k' },
  { id: 'fashion', name: 'Fashion', count: '3.8k' },
  { id: 'home', name: 'Home & Garden', count: '1.2k' },
  { id: 'beauty', name: 'Beauty', count: '960' },
  { id: 'sports', name: 'Sports', count: '750' },
  { id: 'books', name: 'Books', count: '650' },
  { id: 'toys', name: 'Toys & Kids', count: '520' },
  { id: 'automotive', name: 'Automotive', count: '480' },
];

const products = [
  {
    id: '1',
    name: 'Premium Wireless Earbuds',
    price: 450000,
    originalPrice: 599000,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    sold: '1.2k',
    location: 'Jakarta',
    discount: 25,
  },
  {
    id: '2',
    name: 'Smart Watch Fitness Tracker',
    price: 299000,
    originalPrice: 399000,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    sold: '850',
    location: 'Bandung',
    discount: 25,
  },
  {
    id: '3',
    name: 'Mechanical Gaming Keyboard',
    price: 750000,
    originalPrice: 950000,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    sold: '650',
    location: 'Surabaya',
    discount: 21,
  },
  {
    id: '4',
    name: 'Bluetooth Speaker Portable',
    price: 189000,
    originalPrice: 249000,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    sold: '2.1k',
    location: 'Jakarta',
    discount: 24,
  },
  {
    id: '5',
    name: 'Smartphone Gimbal Stabilizer',
    price: 320000,
    originalPrice: 450000,
    image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    sold: '420',
    location: 'Yogyakarta',
    discount: 29,
  },
  {
    id: '6',
    name: 'Wireless Power Bank 20000mAh',
    price: 159000,
    originalPrice: 199000,
    image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    sold: '1.8k',
    location: 'Jakarta',
    discount: 20,
  },
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const renderGridProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.gridProductCard}
      onPress={() => handleProductPress(item.id)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.gridProductImage} />
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
          <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
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
          <Text style={styles.listOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
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
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
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

        {/* Products */}
        <View style={styles.productsContainer}>
          <View style={styles.productsHeader}>
            <Text style={styles.productsCount}>
              {products.length} products found
            </Text>
          </View>
          
          <FlatList
            data={products}
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
    backgroundColor: '#14B8A6',
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
    color: '#14B8A6',
    marginRight: 8,
  },
  listPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#14B8A6',
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
  },
  location: {
    marginLeft: 4,
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
});