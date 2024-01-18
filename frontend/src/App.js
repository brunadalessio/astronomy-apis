import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from '@react-three/drei';
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

function App() {
    const [astronomyData, setAstronomyData] = useState([]);
    const [hoveredBody, setHoveredBody] = useState(null);
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('Making request to server...');
                const response = await axios.get('http://localhost:5000/api/astronomy');
                console.log('Response from server:', response.data);
                setAstronomyData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleBodyHover = (body, event) => {
        setHoveredBody(body);
        setMouseCoords({ x: event.clientX, y: event.clientY });
    };

    const handleBodyLeave = () => {
        setHoveredBody(null);
    };

    return (
        <div className="App" style={{ height: '100vh', backgroundColor: '#000' }}>
            <h1 style={{ color: '#fff', textAlign: 'center' }}>Astronomy Viewer</h1>
            <Canvas camera={{ position: [0, 0, 15] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars />
                <OrbitControls />
                {astronomyData.map((body, index) => (
                    <CelestialBody
                        key={index}
                        name={body.englishName}
                        position={[body.semimajorAxis / 2000, 0, 0]}
                        size={0.4}
                        color={hoveredBody === body ? 'orange' : body.isPlanet ? '#3489eb' : '#bdbdbd'}
                        onPointerOver={(event) => handleBodyHover(body, event)}
                        onPointerOut={handleBodyLeave}
                    />
                ))}
            </Canvas>
            {hoveredBody && (
                <div
                    className="info-panel"
                    style={{
                        position: 'absolute',
                        top: mouseCoords.y,
                        left: mouseCoords.x,
                        color: '#fff',
                        textAlign: 'center',
                    }}
                >
                    <h2>{hoveredBody.englishName}</h2>
                    <p>Semimajor Axis: {hoveredBody.semimajorAxis} km</p>
                    {hoveredBody.mass && (
                        <p>Mass: {hoveredBody.mass.massValue} x 10^{hoveredBody.mass.massExponent} kg</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
