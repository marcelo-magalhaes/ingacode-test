import { parentPort, workerData } from 'worker_threads';
import { updateJobStatusInQueue } from '../database/jobQueue';

export interface WorkerInput {
    jobId: string;
    jsonData: any;
}

async function processJsonDataWorker(input: WorkerInput) {
    const { jobId, jsonData} = input;
    console.log(`Worker ${jobId}: Starting processing`);

    try {
        let progress: number = 0;
        await updateJobStatusInQueue(jobId, {jobId: jobId, status: 'PROCESSING', progress: progress});
        
        for(let i:number = 0; i < jsonData.length ; i++) {
            progress = (i/jsonData.length)*100;
            console.log(`Proress: ${progress}`);
        }

        await updateJobStatusInQueue(jobId, {jobId: jobId, status: 'COMPLETED', progress: 100});
    } catch (e) {
        console.error(`Worker ${jobId}: error during processing`, e);
        await updateJobStatusInQueue(jobId, {jobId: jobId, status: 'FAILED'});

    }
}

if (parentPort && workerData) {
    processJsonDataWorker(workerData as WorkerInput);
}