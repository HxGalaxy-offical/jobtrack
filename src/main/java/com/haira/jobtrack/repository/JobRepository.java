package com.haira.jobtrack.repository;

import com.haira.jobtrack.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
public interface JobRepository extends JpaRepository<Job,Long> {
    
}
