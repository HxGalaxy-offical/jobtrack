package com.haira.jobtrack.exception;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(Long id)
    {
        super("Job not found with id:"+id);
    }
    
}
