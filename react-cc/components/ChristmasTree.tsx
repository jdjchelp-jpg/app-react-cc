import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTranslation, Language } from '@/constants/translations';

interface ChristmasTreeProps {
  progress: number; // 0-100
  language: Language;
}

export const ChristmasTree: React.FC<ChristmasTreeProps> = ({ progress, language }) => {
  const ornamentsToShow = Math.floor((progress / 100) * 12);
  const lightsToShow = Math.floor((progress / 100) * 8);

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        {getTranslation('tree.decorationProgress', language)}: {Math.round(progress)}%
      </Text>
      
      <View style={styles.treeContainer}>
        {/* Tree trunk */}
        <View style={styles.trunk} />
        
        {/* Tree layers */}
        <View style={styles.treeLayer1}>
          {lightsToShow > 0 && <View style={[styles.light, styles.light1]} />}
          {ornamentsToShow > 0 && <View style={[styles.ornament, styles.ornament1, { backgroundColor: '#dc2626' }]} />}
        </View>
        <View style={styles.treeLayer2}>
          {lightsToShow > 1 && <View style={[styles.light, styles.light2]} />}
          {ornamentsToShow > 1 && <View style={[styles.ornament, styles.ornament2, { backgroundColor: '#eab308' }]} />}
          {ornamentsToShow > 2 && <View style={[styles.ornament, styles.ornament3, { backgroundColor: '#3b82f6' }]} />}
        </View>
        <View style={styles.treeLayer3}>
          {lightsToShow > 2 && <View style={[styles.light, styles.light3]} />}
          {ornamentsToShow > 3 && <View style={[styles.ornament, styles.ornament4, { backgroundColor: '#dc2626' }]} />}
          {ornamentsToShow > 4 && <View style={[styles.ornament, styles.ornament5, { backgroundColor: '#eab308' }]} />}
        </View>
        <View style={styles.treeLayer4}>
          {lightsToShow > 3 && <View style={[styles.light, styles.light4]} />}
          {ornamentsToShow > 5 && <View style={[styles.ornament, styles.ornament6, { backgroundColor: '#3b82f6' }]} />}
          {ornamentsToShow > 6 && <View style={[styles.ornament, styles.ornament7, { backgroundColor: '#dc2626' }]} />}
        </View>
        
        {/* Star on top */}
        {progress >= 100 && (
          <View style={styles.star}>
            <Text style={styles.starText}>⭐</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    fontWeight: '600',
  },
  treeContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  trunk: {
    width: 30,
    height: 40,
    backgroundColor: '#8b4513',
    borderRadius: 4,
  },
  treeLayer1: {
    width: 0,
    height: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 60,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#16a34a',
    marginBottom: -50,
    position: 'relative',
  },
  treeLayer2: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 70,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#16a34a',
    marginBottom: -60,
    position: 'relative',
  },
  treeLayer3: {
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#16a34a',
    marginBottom: -70,
    position: 'relative',
  },
  treeLayer4: {
    width: 0,
    height: 0,
    borderLeftWidth: 70,
    borderRightWidth: 70,
    borderBottomWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#16a34a',
    marginBottom: -80,
    position: 'relative',
  },
  light: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fde047',
    shadowColor: '#fde047',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  light1: { top: 20, left: 20 },
  light2: { top: 30, left: 30 },
  light3: { top: 40, left: 40 },
  light4: { top: 50, left: 50 },
  ornament: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  ornament1: { top: 15, left: 15 },
  ornament2: { top: 25, left: 25 },
  ornament3: { top: 25, right: 25 },
  ornament4: { top: 35, left: 35 },
  ornament5: { top: 35, right: 35 },
  ornament6: { top: 45, left: 45 },
  ornament7: { top: 45, right: 45 },
  star: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starText: {
    fontSize: 32,
  },
});

