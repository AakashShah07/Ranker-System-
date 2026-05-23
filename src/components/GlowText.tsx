import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface GlowTextProps {
  children: string;
  color?: string;
  size?: number;
  style?: TextStyle;
  bold?: boolean;
}

export default function GlowText({
  children,
  color = '#00d4ff',
  size = 16,
  style,
  bold = false,
}: GlowTextProps) {
  return (
    <Text
      style={[
        {
          color,
          fontSize: size,
          fontWeight: bold ? '800' : '600',
          textShadowColor: color,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
