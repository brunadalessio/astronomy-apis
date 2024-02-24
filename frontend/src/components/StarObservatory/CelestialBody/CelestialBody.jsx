import React from 'react';
import { Html } from '@react-three/drei';

const CelestialBody = ({ name, position, size, color, onPointerOver, onPointerOut }) => {
    return (
        <group position={position} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
            <mesh>
                <sphereGeometry attach="geometry" args={[size, 32, 32]} />
                <meshStandardMaterial attach="material" color={color} />
            </mesh>
            <Html>
                <div style={{ color: '#ffffff', fontSize: 0.1, textAlign: 'center' }}>
                    {name}
                </div>
            </Html>
        </group>
    );
};

export default CelestialBody;
