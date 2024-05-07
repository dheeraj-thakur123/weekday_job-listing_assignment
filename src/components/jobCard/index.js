import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Avatar,
  Grid
} from '@mui/material'
import { capitalizeWords } from '../../utils/helper'
const currencySymbols = {
  USD: '$',
  EUR: '€',
  IND: '₹'
}

const JobCard = ({
  logoUrl,
  jobRole,
  companyName,
  location,
  jobDetailsFromCompany,
  minExp,
  jdLink,
  minJdSalary,
  maxJdSalary,
  salaryCurrencyCode,
  
}) => {
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      variant='outlined'
      sx={{ maxWidth: 400, marginBottom: 2, minHeight: 350, borderRadius: 6 }}
    >
      <CardContent className='cardContent' sx={{ flex: 1 }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Display the logo */}
          <Avatar
            alt='Company Logo'
            src={logoUrl}
            sx={{ width: 56, height: 56, mr: '10px' }}
          />
          <Grid>
            <Typography variant='subtitle1' color='text.secondary'>
              {companyName}
            </Typography>
            {/* Display the role */}
            <Typography variant='h6' color='text.primary'>
              {capitalizeWords(jobRole)}
            </Typography>
            {/* Display the location */}
            <Typography variant='body2' color='text.primary'>
              {capitalizeWords(location)}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Estimated Salary:{' '}
          {minJdSalary && maxJdSalary
            ? `${currencySymbols[salaryCurrencyCode]}${minJdSalary} - ${currencySymbols[salaryCurrencyCode]}${maxJdSalary}`
            : `${currencySymbols[salaryCurrencyCode]}${
                minJdSalary || maxJdSalary
              }`}
        </Typography>
        <Typography variant='body1' color='text.primary'  sx={{fontWeight:'bold'}}>
          About Company:
        </Typography>
        <Typography variant='body2' color='text.primary'  sx={{fontWeight:'bold'}}>
          About Us:
        </Typography>

        <Collapse
          in={!expanded}
          timeout='auto'
          unmountOnExit
          collapsedSize={50}
        >
          <Typography variant='body2' color='text.secondary' paragraph>
            {jobDetailsFromCompany.substring(0, 150)}{' '}
            {/* Display first 150 characters of job details */}
          </Typography>
        </Collapse>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Typography variant='body2' color='text.secondary' paragraph sx={{textAlign:'justify'}}>
            {jobDetailsFromCompany}{' '}
            {/* Display full job details when expanded */}
          </Typography>
        </Collapse>
        <Grid sx={{ display: 'flex' }}>
          <Button
            onClick={handleExpandClick}
            sx={{ mt: 1, marginLeft: 'auto', marginRight: 'auto' }}
          >
            {expanded ? 'View Less' : 'View More'}
          </Button>
        </Grid>

        {minExp && (
          <Grid item xs={12}>
            <Typography variant='body2' color='text.secondary'>
              Minimum Experience:
              <br />
              {minExp} years
            </Typography>
          </Grid>
        )}

        <Grid
          container
          justifyContent='center'
          sx={{ mt: !minExp ? '48px' : 1 }}
        >
          <Button
            sx={{borderRadius: 3}}
            variant='contained'
            fullWidth
            href={jdLink}
            target='_blank'
            rel='noopener'
          >
            Apply
          </Button>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default JobCard
