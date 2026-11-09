package com.haira.jobtrack.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;


    @Entity 
    @Table(name="job")
    public class Job{
        @Id 
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        @Column(name="jobid")
        private Long jobid;
         @NotBlank (message="Company name is required")
        @Column (name="company_name",nullable=false)
        private String company;
        @NotBlank(message="Job role is required")
        @Column (name="job_role")
        private String jobRole;
        @Column(name="status")
        private String status;

        public Job()
        {

        }
        
        public Job(String company,String jobRole,String status)
        {
            this.company=company;
            this.jobRole=jobRole;
            this.status=status;
        }
        
    // Getters and Setters
        public Long getJobid() {
        return jobid;
    }

    public void setJobid(Long jobid) {
        this.jobid = jobid;
    }
    public String getCompany()
    {
        return company;
    }
    public void setCompany(String company)
    {
        this.company=company;
    }
    public String getJobRole()
    {
        return jobRole;
    }
    public void   setJobRole(String jobRole)
    {
        this.jobRole=jobRole;
    }
     public String getStatus()
    {
        return status;
    }
    public void   setStatus(String status)
    {
        this.status=status;
    }
}
    


