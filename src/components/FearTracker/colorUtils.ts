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
    '--border-color': interpolateRGBA('rgba(115, 40, 230, 0.7)', 'rgba(255, 20, 20, 1)', fearRatio),
    '--box-shadow-color': interpolateRGBA('rgba(90, 25, 200, 0.4)', 'rgba(255, 60, 60, 0.8)', fearRatio),
    '--box-shadow-inner-color': interpolateRGBA('rgba(120, 50, 240, 0.5)', 'rgba(255, 80, 80, 0.7)', fearRatio),

    '--border-start': interpolateRGBA('rgba(110, 45, 225, 0.6)', 'rgba(255, 30, 30, 1)', fearRatio),
    '--box-shadow-start': interpolateRGBA('rgba(80, 20, 180, 0.4)', 'rgba(255, 90, 90, 0.7)', fearRatio),
    '--box-shadow-inner-start': interpolateRGBA('rgba(130, 55, 250, 0.5)', 'rgba(255, 100, 100, 0.7)', fearRatio),

    '--border-end': interpolateRGBA('rgba(115, 40, 230, 0.6)', 'rgba(255, 40, 40, 1)', fearRatio),
    '--box-shadow-end': interpolateRGBA('rgba(80, 20, 180, 0.4)', 'rgba(255, 70, 70, 0.7)', fearRatio),
    '--box-shadow-inner-end': interpolateRGBA('rgba(120, 50, 240, 0.5)', 'rgba(255, 90, 90, 0.7)', fearRatio),
  };
}
