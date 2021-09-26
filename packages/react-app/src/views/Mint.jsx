import React from "react";
import CardCreator from '../components/CardCreator'
import styles from './Mint.module.css'

export default function Mint({ userSigner, provider }) {
  return <div className={styles.Mint}>
    <CardCreator/>
  </div>;
}
