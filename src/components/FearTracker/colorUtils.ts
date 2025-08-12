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
    '--border-color': interpolateRGBA('rgba(168, 85, 247, 0.5)', 'rgba(220, 38, 38, 0.7)', fearRatio),
    '--box-shadow-color': interpolateRGBA('rgba(168, 85, 247, 0.3)', 'rgba(220, 38, 38, 0.5)', fearRatio),
    '--box-shadow-inner-color': interpolateRGBA('rgba(168, 85, 247, 0.4)', 'rgba(220, 38, 38, 0.5)', fearRatio),
    '--border-start': interpolateRGBA('rgba(168, 85, 247, 0.4)', 'rgba(220, 38, 38, 0.7)', fearRatio),
    '--box-shadow-start': interpolateRGBA('rgba(168, 85, 247, 0.2)', 'rgba(220, 38, 38, 0.5)', fearRatio),
    '--box-shadow-inner-start': interpolateRGBA('rgba(168, 85, 247, 0.3)', 'rgba(220, 38, 38, 0.5)', fearRatio),
    '--border-end': interpolateRGBA('rgba(168, 85, 247, 0.4)', 'rgba(220, 38, 38, 0.7)', fearRatio),
    '--box-shadow-end': interpolateRGBA('rgba(168, 85, 247, 0.2)', 'rgba(220, 38, 38, 0.5)', fearRatio),
    '--box-shadow-inner-end': interpolateRGBA('rgba(168, 85, 247, 0.3)', 'rgba(220, 38, 38, 0.5)', fearRatio),
  };
}
