import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, ShoppingBag, Heart, Star, CircleHelp as HelpCircle, Shield, Bell, CreditCard, MapPin, LogOut, ChevronRight, CreditCard as Edit } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';

const menuItems = [
  {
    section: 'Account',
    items: [
      { id: 'orders', title: 'My Orders', icon: ShoppingBag, count: '3' },
      { id: 'wishlist', title: 'Wishlist', icon: Heart },
      { id: 'reviews', title: 'Reviews', icon: Star },
      { id: 'addresses', title: 'Addresses', icon: MapPin },
      { id: 'payment', title: 'Payment Methods', icon: CreditCard },
    ]
  },
  {
    section: 'Preferences',
    items: [
      { id: 'notifications', title: 'Notifications', icon: Bell },
      { id: 'privacy', title: 'Privacy & Security', icon: Shield },
      { id: 'settings', title: 'Settings', icon: Settings },
    ]
  },
  {
    section: 'Support',
    items: [
      { id: 'help', title: 'Help Center', icon: HelpCircle },
    ]
  }
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();
  const { favorites } = useFavorites();

  const handleMenuPress = (itemId: string) => {
    switch (itemId) {
      case 'orders':
        Alert.alert(
          'My Orders', 
          'You have 3 active orders:\n\n• Wireless Earbuds - Shipped\n• Gaming Keyboard - Processing\n• Bluetooth Speaker - Delivered',
          [{ text: 'OK' }]
        );
        break;
      case 'wishlist':
        Alert.alert(
          'Wishlist', 
          `You have ${favorites.length} items in your wishlist.\n\nTap the heart icon on any product to add it to your favorites!`,
          [{ text: 'OK' }]
        );
        break;
      case 'reviews':
        Alert.alert(
          'Reviews', 
          'Your review history:\n\n• 5 reviews written\n• Average rating given: 4.2 stars\n• Helpful votes received: 23',
          [{ text: 'OK' }]
        );
        break;
      case 'addresses':
        Alert.alert(
          'Delivery Addresses', 
          'Manage your delivery addresses:\n\n• Home - Jakarta Selatan\n• Office - Jakarta Pusat\n\nAdd new address or edit existing ones.',
          [
            { text: 'Add New Address', onPress: () => Alert.alert('Add Address', 'Address form would open here') },
            { text: 'OK' }
          ]
        );
        break;
      case 'payment':
        Alert.alert(
          'Payment Methods', 
          'Your saved payment methods:\n\n• **** 1234 (Visa)\n• **** 5678 (Mastercard)\n• GoPay Wallet\n• OVO Wallet',
          [
            { text: 'Add Payment Method', onPress: () => Alert.alert('Add Payment', 'Payment form would open here') },
            { text: 'OK' }
          ]
        );
        break;
      case 'notifications':
        Alert.alert(
          'Notification Settings', 
          'Manage your notifications:\n\n✓ Order updates\n✓ Promotions\n✗ Marketing emails\n✓ Security alerts',
          [
            { text: 'Change Settings', onPress: () => Alert.alert('Settings', 'Notification preferences would open here') },
            { text: 'OK' }
          ]
        );
        break;
      case 'privacy':
        Alert.alert(
          'Privacy & Security', 
          'Your account security:\n\n✓ Two-factor authentication\n✓ Login alerts\n• Last login: Today, 10:30 AM\n• Account created: Jan 2024',
          [
            { text: 'Security Settings', onPress: () => Alert.alert('Security', 'Security settings would open here') },
            { text: 'OK' }
          ]
        );
        break;
      case 'settings':
        Alert.alert(
          'App Settings', 
          'Customize your app experience:\n\n• Language: English\n• Currency: IDR\n• Theme: Light\n• Auto-sync: Enabled',
          [
            { text: 'Open Settings', onPress: () => Alert.alert('Settings', 'App settings would open here') },
            { text: 'OK' }
          ]
        );
        break;
      case 'help':
        Alert.alert(
          'Help Center', 
          'Get help with:\n\n• How to place an order\n• Payment issues\n• Delivery tracking\n• Returns & refunds\n• Account settings',
          [
            { text: 'Contact Support', onPress: () => Alert.alert('Support', 'Support chat would open here') },
            { text: 'Browse FAQ', onPress: () => Alert.alert('FAQ', 'FAQ section would open here') },
            { text: 'OK' }
          ]
        );
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Signed Out', 'You have been successfully signed out.', [
              { text: 'OK', onPress: signOut }
            ]);
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Edit size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.avatar}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'user@email.com'}</Text>
              <Text style={styles.userPhone}>{user?.phone || '+62 812 3456 7890'}</Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>25</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2.5k</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.menuContainer}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    itemIndex === section.items.length - 1 && styles.menuItemLast
                  ]}
                  onPress={() => handleMenuPress(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <item.icon size={20} color="#374151" />
                    </View>
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.id === 'orders' && (
                      <View style={styles.countBadge}>
                        <Text style={styles.countText}>3</Text>
                      </View>
                    )}
                    {item.id === 'wishlist' && favorites.length > 0 && (
                      <View style={styles.countBadge}>
                        <Text style={styles.countText}>{favorites.length}</Text>
                      </View>
                    )}
                    <ChevronRight size={16} color="#9CA3AF" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View style={styles.menuSection}>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.logoutItem} 
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.logoutIcon}>
                  <LogOut size={20} color="#EF4444" />
                </View>
                <Text style={styles.logoutText}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  editButton: {
    padding: 4,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  menuSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 100,
  },
});