import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E5E7EB',
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontSize: 16, fontWeight: '700', color: '#111827' },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Floor Plan',
          tabBarLabel: 'Floor Plan',
          tabBarIcon: ({ color, size }) => (
            <TabIcon label="⬛" color={color} size={size} />
          ),
          headerTitle: 'Floor Plan Editor',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Tabs.Screen
        name="shell"
        options={{
          title: '3D Shell',
          tabBarLabel: '3D Shell',
          tabBarIcon: ({ color, size }) => (
            <TabIcon label="🏗" color={color} size={size} />
          ),
          headerTitle: '3D Shell Viewer',
        }}
      />
      <Tabs.Screen
        name="interior"
        options={{
          title: 'Interior',
          tabBarLabel: 'Interior',
          tabBarIcon: ({ color, size }) => (
            <TabIcon label="🎨" color={color} size={size} />
          ),
          headerTitle: 'Interior Mode',
        }}
      />
    </Tabs>
  )
}

function TabIcon({ label, color, size }: { label: string; color: string; size: number }) {
  const { Text } = require('react-native')
  return <Text style={{ fontSize: size * 0.7 }}>{label}</Text>
}

function HeaderActions() {
  const { TouchableOpacity, Text, View } = require('react-native')
  const { useDesignStore, useUndo, useRedo, useCanUndo, useCanRedo } = require('../../store/useDesignStore')
  const undo = useUndo()
  const redo = useRedo()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()
  return (
    <View style={{ flexDirection: 'row', gap: 8, paddingRight: 16 }}>
      <TouchableOpacity onPress={undo} disabled={!canUndo} style={{ opacity: canUndo ? 1 : 0.3 }}>
        <Text style={{ fontSize: 13, color: '#3B82F6', fontWeight: '600' }}>Undo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={redo} disabled={!canRedo} style={{ opacity: canRedo ? 1 : 0.3 }}>
        <Text style={{ fontSize: 13, color: '#3B82F6', fontWeight: '600' }}>Redo</Text>
      </TouchableOpacity>
    </View>
  )
}
