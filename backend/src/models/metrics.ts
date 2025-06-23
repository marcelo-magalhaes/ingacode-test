export interface Metric {
    sensor_id: string,
    type: string,
    timestamp: Date,
    temperature: number,
    humidity: number,
    dew_point: number
}

export let metrics: Metric[] = []

