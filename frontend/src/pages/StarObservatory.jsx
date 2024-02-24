import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, Stars} from '@react-three/drei';
import CelestialBody from '../components/StarObservatory/CelestialBody/CelestialBody';
import Asteroid from '../components/StarObservatory/Asteroid/Asteroid';

function StarsMovement() {
    const cameraRef = useRef();

    useFrame(() => {
        if (cameraRef.current) {
            const { position } = cameraRef.current;
            const stars = document.querySelector('#stars');
            if (stars) {
                stars.position.x = -position.x * 0.002;
                stars.position.y = -position.y * 0.002;
            }
        }
    });

    return null;
}

function SkyObservatory() {
    const [astronomyData, setAstronomyData] = useState([]);
    const [hoveredBody, setHoveredBody] = useState(null);
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const [celestialColors, setCelestialColors] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/sky');

                const colors = {};
                response.data.forEach((body) => {
                    if (body.englishName === 'Sun') {
                        colors[body.englishName] = 'orange';
                    } else {
                        colors[body.englishName] = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                            Math.random() * 256
                        )}, ${Math.floor(Math.random() * 256)})`;
                    }
                });

                setCelestialColors(colors);
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
            <Canvas
                camera={{ position: [0, 0, 50], up: [0, 0, 1], near: 0.1, far: 10000000000000000 }}
            >
                <ambientLight intensity={1} />
                <pointLight position={[0, 0, 0]} />
                <Stars />
                <OrbitControls />
                <StarsMovement />

                {/* Renderiza apenas o Sol no centro */}
                {astronomyData.map((body, index) => (
                    <group key={index}>
                        {body.englishName === 'Sun' && (
                            <CelestialBody
                                name={body.englishName}
                                position={[body.semimajorAxis / 2000, 0, 0]}
                                size={3}
                                color={celestialColors[body.englishName]}
                                onPointerOver={(event) => handleBodyHover(body, event)}
                                onPointerOut={handleBodyLeave}
                            />
                        )}
                    </group>
                ))}

                {/* Espalha os outros corpos celestes ao redor do Sol */}
                {astronomyData.map((body, index) => (
                    <group key={index}>
                        {body.englishName !== 'Sun' && !body.isPlanet && (
                            <Asteroid
                                name={body.englishName}
                                position={[
                                    (body.semimajorAxis / 2000 + 10) * Math.cos(index * 0.2),
                                    (body.semimajorAxis / 2000 + 10) * Math.sin(index * 0.2),
                                    0,
                                ]}
                                size={0.4}
                                color={celestialColors[body.englishName]}
                                onPointerOver={(event) => handleBodyHover(body, event)}
                                onPointerOut={handleBodyLeave}
                            />
                        )}
                    </group>
                ))}
                {/* renderiza os planetas do sistema solar */}
                {astronomyData.map((body, index) => (
                    <group key={index}>
                        {body.englishName !== 'Sun' && body.isPlanet && (
                            <CelestialBody
                                name={body.englishName}
                                position={[body.semimajorAxis / 0, 0, 0]}
                                size={400}
                                color={celestialColors[body.englishName]}
                                onPointerOver={(event) => handleBodyHover(body, event)}
                                onPointerOut={handleBodyLeave}
                            />
                        )}
                    </group>
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
                        <p>
                            Mass: {hoveredBody.mass.massValue} x 10^{hoveredBody.mass.massExponent} kg
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SkyObservatory;