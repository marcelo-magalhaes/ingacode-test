import limitReference from '../references/limitReferences.json';

export function verifyHighDewPointAlert(dew_point: number): boolean {
    return limitReference.dew_point.alert.max <= dew_point && dew_point < limitReference.dew_point.critical.max;
}

export function verifyHighDewPointCritical(dew_point: number): boolean {
    return (limitReference.dew_point.critical.max) <= (dew_point);
}

export function verifyDewPointNormal(dew_point: number): boolean {
    return !verifyHighDewPointAlert(dew_point) && !verifyHighDewPointCritical(dew_point);
}