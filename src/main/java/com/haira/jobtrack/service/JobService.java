package com.haira.jobtrack.service;
import org.springframework.stereotype.Service;
import com.haira.jobtrack.repository.JobRepository;
import com.haira.jobtrack.entity.Job;
import java.util.List;
import com.haira.jobtrack.exception.JobNotFoundException;
@Service 
public class JobService {
    
    private final JobRepository jobRepository;

    // Constructor
    public JobService(JobRepository jobRepository)
    {
        this.jobRepository = jobRepository;

    }
    // Method
    public Job createJob(Job job)
    {
        return jobRepository.save(job);
    }    
    public List<Job> getAllJobs()
    {
        return jobRepository.findAll();
    }
    public Job getJobById(Long id)
    {
        return jobRepository.findById(id).orElse(null);
    }
    // return nothing => using void
    public void deleteJob(Long id)
    {
        jobRepository.deleteById(id);
    }
    public Job updateJob(Long id,Job updatedJob){
    Job existingJob=jobRepository.findById(id).orElseThrow(()-> new JobNotFoundException(id));
    existingJob.setCompany(updatedJob.getCompany());
    existingJob.setJobRole(updatedJob.getJobRole());
    existingJob.setStatus(updatedJob.getStatus());
    return jobRepository.save(existingJob);
}

}

