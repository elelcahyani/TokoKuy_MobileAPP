import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  Star, 
  MapPin, 
  ShoppingCart,
  Plus,
  Minus,
  Store,
  Shield,
  Truck,
  MessageCircle
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const productImages = [
  'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const reviews = [
  {
    id: '1',
    name: 'Ahmad Rizki',
    rating: 5,
    comment: 'Amazing product! Quality is excellent and delivery was fast.',
    date: '2 days ago',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    rating: 4,
    comment: 'Good quality, but packaging could be better.',
    date: '1 week ago',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    name: 'Budi Santoso',
    rating: 5,
    comment: 'Perfect! Exactly as described. Highly recommended seller.',
    date: '2 weeks ago',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock product data - in real app, fetch based on id
  const product = {
    id: id,
    name: 'Premium Wireless Bluetooth Headphones',
    price: 299000,
    originalPrice: 399000,
    discount: 25,
    rating: 4.8,
    reviewCount: 1250,
    sold: '2.1k',
    images: productImages,
    description: 'Experience premium sound quality with these wireless Bluetooth headphones. Featuring advanced noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, professionals, and anyone who values high-quality audio.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium leather ear cushions',
      'Wireless charging case',
      'Built-in microphone',
      'Bluetooth 5.0 connectivity'
    ],
    seller: {
      name: 'Tech Store Jakarta',
      rating: 4.9,
      location: 'Jakarta Selatan',
      responseTime: '< 1 hour',
    },
    shipping: {
      free: true,
      estimatedDays: '2-3',
      methods: ['Regular', 'Express', 'Same Day'],
    },
    stock: 25,
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `${quantity} item(s) added to your cart.`);
  };

  const handleBuyNow = () => {
    Alert.alert('Buy Now', 'Proceeding to checkout...');
  };

  const updateQuantity = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + change));
    setQuantity(newQuantity);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} color="#F59E0B" fill="#F59E0B" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} color="#D1D5DB" />
      );
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share size={24} color="#111827" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsFavorited(!isFavorited)}
          >
            <Heart 
              size={24} 
              color={isFavorited ? "#EF4444" : "#111827"}
              fill={isFavorited ? "#EF4444" : "none"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentImageIndex(Math.round(x / width));
            }}
            scrollEventThrottle={16}
          >
            {product.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
          </ScrollView>
          <View style={styles.imageIndicator}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: index === currentImageIndex ? '#14B8A6' : '#D1D5DB' }
                ]}
              />
            ))}
          </View>
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
            <Text style={styles.soldCount}>• {product.sold} sold</Text>
          </View>

          {/* Seller Info */}
          <View style={styles.sellerContainer}>
            <View style={styles.sellerInfo}>
              <Store size={20} color="#374151" />
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{product.seller.name}</Text>
                <View style={styles.sellerMeta}>
                  <View style={styles.sellerRating}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.sellerRatingText}>{product.seller.rating}</Text>
                  </View>
                  <Text style={styles.sellerLocation}>
                    <MapPin size={12} color="#9CA3AF" /> {product.seller.location}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <MessageCircle size={20} color="#14B8A6" />
            </TouchableOpacity>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Shipping Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping</Text>
            <View style={styles.shippingInfo}>
              <View style={styles.shippingItem}>
                <Truck size={20} color="#14B8A6" />
                <Text style={styles.shippingText}>
                  {product.shipping.free ? 'Free Shipping' : 'Paid Shipping'}
                </Text>
              </View>
              <View style={styles.shippingItem}>
                <Shield size={20} color="#14B8A6" />
                <Text style={styles.shippingText}>
                  Estimated {product.shipping.estimatedDays} days
                </Text>
              </View>
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews ({product.reviewCount})</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {reviews.slice(0, 3).map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      {renderStars(review.rating)}
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(-1)}
          >
            <Minus size={16} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(1)}
          >
            <Plus size={16} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <ShoppingCart size={20} color="#14B8A6" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buyNowButton}
            onPress={handleBuyNow}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    lineHeight: 28,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#14B8A6',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginRight: 4,
  },
  soldCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sellerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  sellerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  sellerRatingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 4,
  },
  sellerLocation: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  chatButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#14B8A6',
    borderRadius: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: '#14B8A6',
    marginRight: 8,
    fontFamily: 'Inter-Bold',
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 22,
  },
  shippingInfo: {
    gap: 12,
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 8,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#14B8A6',
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginLeft: 8,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginRight: 16,
  },
  quantityButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    minWidth: 40,
    textAlign: 'center',
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#14B8A6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#14B8A6',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});