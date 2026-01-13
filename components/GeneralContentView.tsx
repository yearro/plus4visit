import React, { ReactNode } from 'react'
import { appBgColor } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

interface iProps {
  children: ReactNode;
};

const GeneralContentView = ({ children }: iProps) => {
  return (
    <LinearGradient
      colors={[appBgColor, '#fff', appBgColor]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  )
}

export default GeneralContentView