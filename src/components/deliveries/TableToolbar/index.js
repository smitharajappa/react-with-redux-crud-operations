import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const EnhancedTableToolbar = (props) => {
    return (
      <Toolbar
        className="tool-bar"
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          align="left"
          component="div">
          Late Delivery
        </Typography>  
        <Tooltip>
          <IconButton>
            <ArrowDropDownIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  }

  export default EnhancedTableToolbar