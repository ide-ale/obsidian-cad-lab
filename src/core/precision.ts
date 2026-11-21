import { Point } from './model';
import { angle, distance, normAngle, ortho, polar } from './geometry';

export function gridPoint(p: Point, step: number): Point {
  if (!(step > 0 && Number.isFinite(step))) throw new Error('Invalid grid spacing');
  return { x: Math.round(p.x / step) * step, y: Math.round(p.y / step) * step };
}

export interface PolarTrackMatch {
  point: Point;
  angle: number;
}

/**
 * Checks if `p` relative to `base` lies within `toleranceDeg` of a multiple of `incrementDeg`.
 * Returns the projected point along that polar ray and the snapped angle.
 */
export function polarTrackPoint(
  p: Point,
  base: Point,
  incrementDeg = 45,
  toleranceDeg = 4.5,
): PolarTrackMatch | undefined {
  if (!(incrementDeg > 0 && Number.isFinite(incrementDeg))) return undefined;
  const dist = distance(base, p);
  if (dist < 1e-6) return undefined;
  const rawAngle = normAngle(angle(base, p));
  const snapped = normAngle(Math.round(rawAngle / incrementDeg) * incrementDeg);
  let diff = Math.abs(rawAngle - snapped);
  if (diff > 180) diff = 360 - diff;
  if (diff <= toleranceDeg) {
    return {
      point: polar(base, dist, snapped),
      angle: snapped === 360 ? 0 : snapped,
    };
  }
  return undefined;
}

export function constrainedPoint(
  p: Point,
  base: Point | undefined,
  orthogonal: boolean,
  gridStep?: number,
  polarIncrement?: number,
): Point {
  if (orthogonal && base) {
    const q = gridStep ? gridPoint(p, gridStep) : p;
    return ortho(base, q);
  }
  if (gridStep) {
    return gridPoint(p, gridStep);
  }
  if (polarIncrement && base) {
    const tracked = polarTrackPoint(p, base, polarIncrement);
    if (tracked) return tracked.point;
  }
  return p;
}
