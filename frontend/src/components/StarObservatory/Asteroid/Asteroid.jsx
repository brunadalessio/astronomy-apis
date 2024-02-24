import React from 'react';
import { Html } from '@react-three/drei';

const Asteroid = ({ name, position, size, color, onPointerOver, onPointerOut }) => {
    return (
        <group position={position} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
            <mesh>
                <icosahedronGeometry attach="geometry" args={[size, 0]} />
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

export default Asteroid;
