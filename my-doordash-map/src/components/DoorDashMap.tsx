import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface City {
  name: string;
  x: number;
  y: number;
}

const CITY_COORDINATES: Record<string, {x: number, y: number}> = {
  "New York": { x: 820, y: 220 },
  "Los Angeles": { x: 100, y: 300 },
  "Chicago": { x: 650, y: 200 },
  "Houston": { x: 550, y: 400 },
  "Phoenix": { x: 200, y: 350 },
  "Philadelphia": { x: 800, y: 230 },
  "San Francisco": { x: 80, y: 250 },
  "Seattle": { x: 120, y: 100 },
  "Miami": { x: 750, y: 450 },
  "Denver": { x: 350, y: 250 },
  "Boston": { x: 850, y: 180 },
  "Detroit": { x: 700, y: 190 },
  "Atlanta": { x: 700, y: 350 }
};

const DoorDashMap: React.FC = () => {
  const [dashedCities, setDashedCities] = useState<City[]>([]);
  const [newCity, setNewCity] = useState<string>('');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  
  const addCity = (): void => {
    const cityCoords = CITY_COORDINATES[newCity];
    if (newCity && cityCoords && !dashedCities.some(city => city.name === newCity)) {
      const newCityObj: City = {
        name: newCity,
        x: cityCoords.x,
        y: cityCoords.y
      };
      setDashedCities([...dashedCities, newCityObj]);
      setNewCity('');
    }
  };

  const removeCity = (cityName: string): void => {
    setDashedCities(dashedCities.filter(city => city.name !== cityName));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>My DoorDash Cities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Try: New York, Los Angeles, Chicago..."
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="flex-grow"
            list="cities"
          />
          <datalist id="cities">
            {Object.keys(CITY_COORDINATES).map(city => (
              <option key={city} value={city} />
            ))}
          </datalist>
          <Button onClick={addCity}>Add City</Button>
        </div>

        <div className="relative border rounded-lg overflow-hidden bg-blue-50">
          <svg viewBox="0 0 959 593" className="w-full h-auto">
            {/* US Map outline */}
            <path
              d="M 52 177 L 67 177 L 71 180 L 79 203 L 75 228 L 77 238 L 76 244 L 77 252 L 72 264 L 65 275 L 60 278 L 61 283 L 58 289 L 62 294 L 61 304 L 62 318 L 65 331 L 69 344 L 73 353 L 76 355 L 77 360 L 77 365 L 77 368 L 77 373 L 78 378 L 77 381 L 78 385 L 81 388 L 83 393 L 80 396 L 81 400 L 80 404 L 78 407 L 79 410 L 82 414 L 83 418 L 82 425 L 83 430 L 85 435 L 83 440 L 85 444 L 88 449 L 89 453 L 88 457 L 88 461 L 93 465 L 96 470 L 97 474 L 94 478 L 96 482 L 100 486 L 101 491 L 100 495 L 101 499 L 104 503 L 106 507 L 104 512 L 106 517 L 109 520"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              className="opacity-30"
            />
            {/* Add more state outlines here */}
            
            {/* Background for water */}
            <rect x="0" y="0" width="959" height="593" fill="#f0f9ff" className="opacity-30"/>

            {/* Grid lines for reference */}
            <g className="opacity-10">
              {[...Array(20)].map((_, i) => (
                <line
                  key={`vertical-${i}`}
                  x1={i * 50}
                  y1="0"
                  x2={i * 50}
                  y2="593"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`horizontal-${i}`}
                  x1="0"
                  y1={i * 50}
                  x2="959"
                  y2={i * 50}
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />
              ))}
            </g>

            {/* Cities */}
            {dashedCities.map((city, index) => (
              <g 
                key={index} 
                className="cursor-pointer transition-transform duration-200 ease-in-out" 
                onClick={() => removeCity(city.name)}
                onMouseEnter={() => setHoveredCity(city.name)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{
                  transform: hoveredCity === city.name ? 'scale(1.2)' : 'scale(1)',
                  transformOrigin: `${city.x}px ${city.y}px`
                }}
              >
                {/* Pulse animation for the city dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="12"
                  fill="#ef4444"
                  className="opacity-20 animate-ping"
                />
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="6"
                  fill="#ef4444"
                  className={`transition-all duration-300 ${
                    hoveredCity === city.name ? 'fill-red-700' : 'fill-red-500'
                  }`}
                />
                <text
                  x={city.x + 10}
                  y={city.y + 5}
                  className={`text-sm font-medium transition-all duration-300 ${
                    hoveredCity === city.name ? 'fill-red-700' : 'fill-gray-700'
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  {city.name}
                  {hoveredCity === city.name && (
                    <tspan x={city.x + 10} y={city.y + 20} className="text-xs fill-red-500">
                      Dashed!
                    </tspan>
                  )}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Cities I've Dashed In:</h3>
          <ul className="list-disc pl-6 grid grid-cols-2 md:grid-cols-3 gap-2">
            {dashedCities.map((city, index) => (
              <li 
                key={index} 
                className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                onClick={() => removeCity(city.name)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoorDashMap;
