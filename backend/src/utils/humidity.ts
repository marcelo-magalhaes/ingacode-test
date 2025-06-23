import limitReference from '../references/limitReferences.json'

export function verifyHumidityHighAlert(humidity: number): boolean {
    return (limitReference.humidity.alert.max <= humidity) && (humidity < limitReference.humidity.critical.max);
}

export function verifyHumidityHighCritical(humidity: number): boolean {
    return limitReference.humidity.critical.max <= humidity;
}

export function verifyHumidityLowAlert(humidity: number): boolean {
    return (limitReference.humidity.alert.min >= humidity) && (humidity > limitReference.humidity.critical.min);
}

export function verifyHumidityLowCritical(humidity: number): boolean {
    return limitReference.humidity.critical.min >= humidity;
}

export function verifyNormalHumidity(humidity: number): boolean {
    return !verifyHumidityHighAlert(humidity) && !verifyHumidityHighCritical(humidity) && !verifyHumidityLowAlert(humidity) && !verifyHumidityLowCritical(humidity);
}