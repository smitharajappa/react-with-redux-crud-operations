import React from 'react'
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({value, onChange}) => {
  return (
    <Grid className='search-box' container spacing={1}>
    <Grid item xs={4}>
      <span className="wrapper" tabIndex={0}>
        <SearchIcon className="search_icon" sx={{fontSize: '20px', color:'#000000'}} />
        <input
          type="text"
          value={value}
          placeholder="Search"
          onChange={onChange}
          aria-label="search"
          aria-describedby="search"
        />
      </span>
</Grid>
</Grid>
  )
}

export default Search
