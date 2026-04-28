import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar
} from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0533" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏠 AIjia Smart</Text>
        <Text style={styles.headerSub}>AI-Powered Home</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Welcome to AIjia</Text>
          <Text style={styles.heroText}>
            Smart home solutions powered by artificial intelligence
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          {['🌡️ Climate', '💡 Lighting', '🔒 Security', '🎵 Audio'].map((item) => (
            <TouchableOpacity key={item} style={styles.featureCard}>
              <Text style={styles.featureText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>24°C</Text>
            <Text style={styles.statLabel}>Temperature</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>65%</Text>
            <Text style={styles.statLabel}>Humidity</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>ON</Text>
            <Text style={styles.statLabel}>Security</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {['Home', 'Devices', 'Scenes', 'Profile'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.navText, activeTab === tab && styles.navActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0533' },
  header: { padding: 20, paddingTop: 10, backgroundColor: '#2d0a5e' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headerSub: { color: '#c084fc', fontSize: 14 },
  content: { flex: 1, padding: 16 },
  heroCard: {
    backgroundColor: '#2d0a5e', borderRadius: 16,
    padding: 20, marginBottom: 16
  },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  heroText: { color: '#c084fc', fontSize: 14, lineHeight: 22 },
  featuresGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', marginBottom: 16
  },
  featureCard: {
    backgroundColor: '#3b0764', borderRadius: 12,
    padding: 16, width: '48%', marginBottom: 12, alignItems: 'center'
  },
  featureText: { color: '#fff', fontSize: 16 },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#2d0a5e', borderRadius: 16, padding: 16
  },
  statBox: { alignItems: 'center' },
  statNum: { color: '#c084fc', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#fff', fontSize: 12, marginTop: 4 },
  bottomNav: {
    flexDirection: 'row', backgroundColor: '#2d0a5e',
    paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#3b0764'
  },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { color: '#9ca3af', fontSize: 12 },
  navActive: { color: '#c084fc', fontWeight: 'bold' },
});
