import React from 'react';
import { Image } from 'react-native';
import styles from './Teacher/Course/Style'

export default function Logo() {
    return (<Image
        style={styles.logo}
        source={require('../assets/yliam3.png')}
    />)
}