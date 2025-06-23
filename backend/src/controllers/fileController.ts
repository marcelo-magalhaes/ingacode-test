import { Request, Response, NextFunction } from "express";
import { metrics, MetricAnalyzed, MetricResult } from "../types/metrics";
import limitReference from '../references/limitReferences.json';
import { verifyNormalTemperature, verifyTemperatureHighAlert, verifyTemperatureHighCritical, verifyTemperatureLowAlert, verifyTemperatureLowCritical } from "../utils/temperature";
import { verifyHumidityHighAlert, verifyHumidityHighCritical, verifyHumidityLowAlert, verifyHumidityLowCritical, verifyNormalHumidity } from "../utils/humidity";
import { verifyDewPointNormal, verifyHighDewPointAlert, verifyHighDewPointCritical } from "../utils/dew_point";
import { Notification, sendNotification } from "../rabbitmq/notification";
import fs from 'fs';





export const receiveData = async (request: Request, response: Response, next: NextFunction) => {
    const metrics: metrics = request.body;
    const analyzedMetric: MetricAnalyzed = {};
    
    metrics.forEach(metric => {
        let critical: boolean = false, criticalTemperature = false, criticalHumidity = false, criticalDewPoint = false;
        let invalid: boolean = false;
        let statusTemperature: string = 'normal', statusHumidity: string = 'normal', statusDewPoint: string = 'normal';
        let limitTypeTemperature: string = '', limitTypeHumidity: string = '';
        let thresholdValueTemperature: number = 0, thresholdValueHumidity: number = 0, thresholdValueDewPoint: number = 0;
        
        if (!analyzedMetric.hasOwnProperty(metric.type)) {
            
            if (metric.humidity === null || metric.temperature === null || metric.dew_point === null) {
                invalid = true;
            }
            
            analyzedMetric[metric.type] = {
                total: 1,
                invalid: invalid ? 1 : 0,
                valid: !invalid ? 1 : 0,
                highTemperatureAlert: verifyTemperatureHighAlert(metric.temperature) ? 1 : 0, 
                lowTemperatureAlert: verifyTemperatureLowAlert(metric.temperature) ? 1 : 0, 
                highTemperatureCritical: verifyTemperatureHighCritical(metric.temperature) ? 1 : 0, 
                lowTemperatureCritical: verifyTemperatureLowCritical(metric.temperature) ? 1 : 0, 
                highHumidityAlert: verifyHumidityHighAlert(metric.humidity) ? 1 : 0,
                lowHumidityAlert: verifyHumidityLowAlert(metric.temperature) ? 1 : 0,
                highHumidityCritical: verifyHumidityHighCritical(metric.humidity) ? 1 : 0,
                lowHumidityCritical: verifyHumidityLowCritical(metric.humidity) ? 1 : 0,
                highDewPointAlert: verifyHighDewPointAlert(metric.dew_point) ? 1 : 0,
                highDewPointCritical: verifyHighDewPointCritical(metric.dew_point) ? 1 : 0,
                normal: verifyNormalHumidity(metric.humidity) && verifyNormalTemperature(metric.temperature) && verifyDewPointNormal(metric.dew_point) ? 1 : 0,
                metrics: new Array<MetricResult>()
            }

        } else {
            analyzedMetric[metric.type].total += 1;
            if (metric.humidity === null || metric.temperature === null || metric.dew_point === null) {
                analyzedMetric[metric.type].invalid += 1;
                invalid = true;
            } else {
                analyzedMetric[metric.type].valid += 1;
            }
            
            if (verifyNormalHumidity(metric.humidity) && verifyNormalTemperature(metric.temperature) && verifyDewPointNormal(metric.dew_point)) {
                analyzedMetric[metric.type].normal += 1;
            } 
            
            if (!verifyNormalTemperature(metric.temperature)) {
                if (verifyTemperatureHighAlert(metric.temperature)) {
                    analyzedMetric[metric.type].highTemperatureAlert += 1;
                    limitTypeTemperature = 'max';
                } else if (verifyTemperatureHighCritical(metric.temperature)) {
                    limitTypeTemperature = 'max';
                    analyzedMetric[metric.type].highTemperatureCritical += 1;
                    criticalTemperature = true;
                } else if (verifyTemperatureLowAlert(metric.temperature)) {
                    limitTypeTemperature = 'min';
                    analyzedMetric[metric.type].lowTemperatureAlert += 1;
                } else if(verifyTemperatureLowCritical(metric.temperature)) {
                    limitTypeTemperature = 'min';
                    analyzedMetric[metric.type].lowTemperatureCritical += 1;
                    criticalTemperature = true;
                }
                thresholdValueTemperature = metric.temperature;
                if(criticalTemperature === true) {
                    statusTemperature = 'critical';
                    critical = true;
                } else { 
                    statusTemperature = 'alert';
                }
            }

            if (!verifyNormalHumidity(metric.humidity)) {
                if (verifyHumidityHighAlert(metric.humidity)) {
                    limitTypeHumidity = 'max';
                    analyzedMetric[metric.type].highHumidityAlert += 1;
                } else if (verifyHumidityHighCritical(metric.humidity)) {
                    limitTypeHumidity = 'max';
                    analyzedMetric[metric.type].highHumidityCritical += 1;
                    criticalHumidity = true;
                } else if (verifyHumidityLowAlert(metric.humidity)) {
                    limitTypeHumidity = 'min';
                    analyzedMetric[metric.type].lowHumidityAlert += 1;
                } else {
                    limitTypeHumidity = 'min';
                    analyzedMetric[metric.type].lowHumidityCritical += 1;
                    criticalHumidity = true;
                }
                thresholdValueHumidity = metric.humidity;

                if (criticalHumidity == true) {
                    statusHumidity = 'critical';
                    critical = true;
                } else {
                    statusHumidity = 'alert';
                }

            }

            if (!verifyDewPointNormal(metric.dew_point)) {
                if (verifyHighDewPointAlert(metric.dew_point)) {
                    analyzedMetric[metric.type].highDewPointAlert += 1;
                } else {
                    analyzedMetric[metric.type].highDewPointCritical += 1;
                    criticalDewPoint = true;
                }
                thresholdValueDewPoint = metric.dew_point;
                if (criticalDewPoint === true) {
                    statusDewPoint = 'critical';
                    critical = true;
                } else {
                    statusDewPoint = 'alert';
                }
            }
        }

        analyzedMetric[metric.type].metrics.push({
                sensor_id: metric.sensor_id,
                type: metric.type,
                timestamp: metric.timestamp,
                analysis: {
                    temperature: {
                        status: statusTemperature,
                        limit_type: limitTypeTemperature,
                        threshold_value: thresholdValueTemperature
                    },
                    humidity: {
                        status: statusHumidity,
                        limit_type: limitTypeHumidity,
                        threshold_value: thresholdValueHumidity
                    },
                    dew_point: {
                        status: statusDewPoint,
                        limit_type: 'max',
                        threshold_value: thresholdValueDewPoint
                    },
                    anomaly: {
                        status: invalid ? 'invalid' : 'normal'
                    }
                }
            })

        if (critical || invalid) {
            const notification:Notification = {
                sensor_id: metric.sensor_id,
                timestamp: metric.timestamp,
                reason: invalid ? 'anomaly' : 'critical'
            }

            sendNotification(notification)
        }
    });
    
    fs.writeFile('result.json', JSON.stringify(analyzedMetric), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        }
    })
    response.status(200);
    response.send(JSON.stringify(analyzedMetric));
}