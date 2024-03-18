/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from '@react-three/drei';
import Lights from './Lights';
import { Suspense } from 'react';
import IPhoneModel from './IPhone';
import * as THREE from 'three';
import Loader from './Loader';

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute size-full ${index === 2 ? '-right-full' : ''} `}>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1 ? 'small' : 'large'}`}
        position={[0, 0, 0]}>
        <Suspense
          fallback={
            <Html>
              <Loader/>
            </Html>
          }>
          <IPhoneModel
            scale={index===1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
