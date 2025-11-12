import { Tabs } from 'expo-router';
import { Chrome as Home, Grid3x3 as Grid3X3, ShoppingCart, User } from 'lucide-react-native';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useCart } from '@/contexts/CartContext';

function TabBarIcon({ icon: Icon, color, focused }: { icon: any, color: string, focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      <Icon size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
    </View>
  );
}

function CartTabIcon({ color, focused }: { color: string, focused: boolean }) {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <View style={styles.tabIcon}>
      <ShoppingCart size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
      {cartCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>
            {cartCount > 99 ? '99+' : cartCount.toString()}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  const isWeb = Platform.OS === 'web';
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: [
          styles.tabBar,
          isWeb && styles.webTabBar,
          Platform.OS === 'ios' && styles.iosTabBar,
          Platform.OS === 'android' && styles.androidTabBar,
        ],
        tabBarLabelStyle: [
          styles.tabBarLabel,
          isWeb && styles.webTabBarLabel,
        ],
        tabBarItemStyle: [
          styles.tabBarItem,
          isWeb && styles.webTabBarItem,
        ],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={Home} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={Grid3X3} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <CartTabIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={User} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 70,
    paddingBottom: 12,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  webTabBar: {
    height: 80,
    paddingBottom: 16,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#F3F4F6',
  },
  iosTabBar: {
    height: 85,
    paddingBottom: 20,
  },
  androidTabBar: {
    height: 70,
    paddingBottom: 12,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginTop: 4,
  },
  webTabBarLabel: {
    fontSize: 14,
    marginTop: 6,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  webTabBarItem: {
    paddingVertical: 8,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
});