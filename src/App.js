// src/components/JobListings.js
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from './redux/action/jobAction'
import JobCard from './components/jobCard'
import { CircularProgress, Grid, TextField } from '@mui/material'
import FilterAutocomplete from './components/hoc/autoComplete'
import { capitalizeWords } from './components/utils/helper'

const experienceOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const basePayOptions = [1, 5, 10, 20, 30, 50, 80, 100, 150, 200]
const jobTypeOptions = ['Remote', 'In-office', 'Hybrid']

const App = () => {
  const dispatch = useDispatch()
  const { jobs, loading, error, limit, offset, hasMore } = useSelector(
    state => state.jobs
  )

  // State variables for filter options
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    jobType: '',
    techStack: '',
    role: '',
    minBasePay: ''
  })
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const [roles, setRoles] = useState([])
  const [location, setLocations] = useState([])

  // Function to apply filters and fetch filtered jobs
  const applyFilters = useCallback(() => {
    let filterJobs = jobs.filter(job => {
      // Apply filters here
      return (
        ((job.minExp && job.minExp <= filters.minExperience) ||
          !filters.minExperience) &&
        ((job.jobRole &&
          job.jobRole?.toLowerCase().includes(filters.role?.toLowerCase())) ||
          !filters.role) &&
        ((job.maxJdSalary && job.maxJdSalary >= parseInt(filters.minBasePay)) ||
          !filters.minBasePay) &&
        (job.companyName
          ?.toLowerCase()
          .includes(filters.companyName?.trim().toLowerCase()) ||
          !filters.companyName) &&
        ((filters.jobType === 'Remote' &&
          job.location?.toLowerCase().includes('remote')) || // Filter for remote jobs
          (filters.jobType === 'In-office' &&
            !job.location?.toLowerCase().includes('remote')) || // Filter for in-office jobs
          !filters.jobType) &&
        (job.location
          ?.toLowerCase()
          .includes(filters.location?.toLowerCase()) ||
          !filters.location)
      )
    })
    setFilteredJobs(filterJobs.length > 0 ? filterJobs : [])
  })

  useEffect(() => {
    // Fetch initial data when component mounts
    if (jobs.length === 0) {
      dispatch(fetchJobs(limit, offset))
    } else {
      // Extract unique roles from the list of jobs
      const uniqueRoles = [
        ...new Set(jobs.map(job => capitalizeWords(job.jobRole)))
      ]
      const uniqueLocations = [
        ...new Set(
          jobs
            .filter(job => job.location !== 'remote') // Filter out 'remote' locations
            .map(job => capitalizeWords(job.location))
        )
      ]
      setRoles(uniqueRoles)
      setLocations(uniqueLocations)

      //fileter

      setFilteredJobs(jobs)
    }
  }, [dispatch, jobs, limit, offset])

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight >= scrollHeight && !loading && hasMore) {
      // Fetch more data...
      dispatch(fetchJobs(limit, offset + limit))
    }
  }

  useEffect(() => {
    // Apply filters whenever the filters state changes
    applyFilters()
  }, [filters, jobs])

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll)
    return () => {
      // Remove scroll event listener when component unmounts
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Render job listings
  return (
    <Grid container spacing={2} sx={{padding:'16px 16px'  }}>
      <Grid
        item
        container
        xs={12}
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {roles.length > 0 && (
          <>
            <Grid item xs={12} sm={6} md={1.7} >
              <FilterAutocomplete
                label='Roles'
                options={roles}
                value={filters.role || ''}
                onChange={value => setFilters({ ...filters, role: value })}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6} md={1.7}>
          <FilterAutocomplete
            label='Experience (in years)'
            options={experienceOptions}
            value={filters.minExperience || ''}
            onChange={value => setFilters({ ...filters, minExperience: value })}
          />
        </Grid>
        {location.length > 0 && (
          <Grid item xs={12} sm={6} md={1.7}>
            <FilterAutocomplete
              label='Location'
              options={location}
              value={filters.location || ''}
              onChange={value => setFilters({ ...filters, location: value })}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={1.7}>
          <TextField
            fullWidth
            label='Search Company Name'
            value={filters.companyName || ''}
            onChange={event =>
              setFilters({ ...filters, companyName: event.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FilterAutocomplete
            label='Minimum Base Pay Salary($)'
            options={basePayOptions}
            value={filters.minBasePay || ''}
            onChange={value => setFilters({ ...filters, minBasePay: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1.7}>
          <FilterAutocomplete
            label='Job Type'
            options={jobTypeOptions}
            value={filters.jobType || ''}
            onChange={value => setFilters({ ...filters, jobType: value })}
          />
        </Grid>
      </Grid>
      {filteredJobs.map((job, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ height: '100%' }}>
            <JobCard {...job} />
          </div>
        </Grid>
      ))}
      {/* {loading && <p>Loading more...</p>} */}
      {loading && (
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        >
          <CircularProgress
            sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </Grid>
      )}
      {error && <p>Error: {error}</p>}
    </Grid>
  )
}
export default App
