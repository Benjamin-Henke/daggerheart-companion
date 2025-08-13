import React from 'react';

function interpolateRGBA (start: string, end: string, ratio: number): string {
  // parse RGBA strings into components, interpolate each channel, reassemble string
  const parseRGBA = (rgba: string) => {
    const m = rgba.match(/rgba?\((\d+), ?(\d+), ?(\d+),? ?([\d.]*)\)/);
    if (!m) return null;
    return {
      r: parseInt(m[1]),
      g: parseInt(m[2]),
      b: parseInt(m[3]),
      a: m[4] === '' ? 1 : parseFloat(m[4]),
    };
  };

  const s = parseRGBA(start);
  const e = parseRGBA(end);
  if (!s || !e) return start;

  const r = Math.round(s.r + (e.r - s.r) * ratio);
  const g = Math.round(s.g + (e.g - s.g) * ratio);
  const b = Math.round(s.b + (e.b - s.b) * ratio);
  const a = s.a + (e.a - s.a) * ratio;

  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
};


export function getFearStyles(fearRatio: number): React.CSSProperties & Record<string, string> {
  return {
    '--border-color': interpolateRGBA('rgba(139, 0, 0, 0.6)', 'rgba(255, 20, 20, 1)', fearRatio), // darkred → bright red
    '--box-shadow-color': interpolateRGBA('rgba(178, 34, 34, 0.4)', 'rgba(255, 60, 60, 0.85)', fearRatio), // firebrick → red
    '--box-shadow-inner-color': interpolateRGBA('rgba(139, 0, 0, 0.5)', 'rgba(255, 80, 80, 0.75)', fearRatio), // darkred → light red

    // Pulse start colors
    '--border-start': interpolateRGBA('rgba(165, 42, 42, 0.6)', 'rgba(255, 30, 30, 1)', fearRatio), // brownish red → bright red
    '--box-shadow-start': interpolateRGBA('rgba(139, 0, 0, 0.4)', 'rgba(255, 90, 90, 0.75)', fearRatio),
    '--box-shadow-inner-start': interpolateRGBA('rgba(178, 34, 34, 0.5)', 'rgba(255, 100, 100, 0.75)', fearRatio),

    // Pulse peak colors
    '--border-end': interpolateRGBA('rgba(165, 42, 42, 0.6)', 'rgba(255, 50, 50, 1)', fearRatio),
    '--box-shadow-end': interpolateRGBA('rgba(139, 0, 0, 0.45)', 'rgba(255, 70, 70, 0.8)', fearRatio),
    '--box-shadow-inner-end': interpolateRGBA('rgba(178, 34, 34, 0.5)', 'rgba(255, 90, 90, 0.8)', fearRatio),
  };
}
