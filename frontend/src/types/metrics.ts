export type metrics = {
    "sensor_id": string,
    "type": string,
    "timestamp": Date,
    "temperature": number,
    "humidity": number,
    "dew_point": number
}[]

export type TemperatureResult = {
    status: string,
    limit_type: string,
    threshold_value: number
}

export type HumidityResult = {
    status: string,
    limit_type: string,
    threshold_value: number
}

export type DewPointResult = {
    status: string,
    limit_type: string,
    threshold_value: number
}

export type AnomalyResult = {
    status: string
}

export type MetricResult = {
    sensor_id:string,
    type: string,
    timestamp:Date,
    analysis: {
        temperature: TemperatureResult,
        humidity: HumidityResult,
        dew_point: DewPointResult,
        anomaly: AnomalyResult
    }
}

export type MetricAnalyzed = {
    [type: string]: {
        total: number,
        invalid: number,
        valid: number,
        normal: number,
        highTemperatureAlert: number,
        lowTemperatureAlert: number,
        highTemperatureCritical: number,
        lowTemperatureCritical: number,
        highHumidityAlert: number,
        lowHumidityAlert: number,
        highHumidityCritical: number,
        lowHumidityCritical: number,
        highDewPointAlert: number,
        highDewPointCritical: number,
        metrics: MetricResult[]
    }
}