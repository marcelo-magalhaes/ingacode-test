interface JobStatus {
    jobId: string;
    status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    progress: number;
}

const jobQueue = new Map<string, JobStatus>();

export async function saveJobIntoQueue(job: JobStatus): Promise<void> {
    jobQueue.set(job.jobId, job);
    console.log(`New Job ${job.jobId}`);
}

export async function updateJobStatusInQueue(jobId: string, updates: Partial<JobStatus>): Promise<void> {
    const existingJob = jobQueue. get(jobId);
    if (existingJob) {
        const updateJob = {
            ...existingJob,
            ...updates
        }
        jobQueue.set(jobId, updateJob);
        console.log(`Job ${jobId} updated to ${updates.status || existingJob.status} (Progress ${updates.progress !== undefined ? updates.progress : existingJob.progress})`);
    } else {
        console.warn('Non existing job!');
    }
}

export async function getJobStatusFromDb(jobId: string): Promise<JobStatus | undefined> {
    return jobQueue.get(jobId);
}

export function generateUniqueId(): string {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
}