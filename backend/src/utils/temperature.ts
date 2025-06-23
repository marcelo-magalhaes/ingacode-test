import limitReference from '../references/limitReferences.json';

export function verifyTemperatureHighAlert(temperature: number): boolean {
    return (limitReference.temperature.alert.max <= temperature) && (temperature < limitReference.temperature.critical.max)
}

export function verifyTemperatureHighCritical(temperature: number): boolean {
    return (limitReference.temperature.critical.max <= temperature);
}

export function verifyTemperatureLowAlert(temperature: number): boolean {
    return (limitReference.temperature.alert.min >= temperature) && (temperature > limitReference.temperature.critical.min);
}

export function verifyTemperatureLowCritical(temperature: number): boolean {
    return (limitReference.temperature.critical.min >= temperature);
}

export function verifyNormalTemperature(temperature: number): boolean {
    return !verifyTemperatureHighAlert(temperature) && !verifyTemperatureHighCritical(temperature) && !verifyTemperatureLowAlert(temperature) && !verifyTemperatureLowCritical(temperature);
}