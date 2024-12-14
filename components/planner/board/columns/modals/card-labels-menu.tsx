import React, { FC } from "react";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import { MdLabelOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

type IProps = {
  id: string;
  boardId: string;
};

const cardLabels = [
  {
    type: "performance",
    bg: "#0079bf",
  },
  {
    type: "bug",
    bg: "#eb5a46",
  },
  {
    type: "feature",
    bg: "#61bd4f",
  },
  {
    type: "information",
    bg: "#ff9f1a",
  },
  {
    type: "warning",
    bg: "#f2d600",
  },
];

const CardLabel: FC<IProps> = ({ id, boardId }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = async (label) => {
    const data = {
      _id: id,
      boardId,
      label,
    };

    // await dispatch(updateCard(data));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box marginTop="2rem" display="flex" flexDirection="column" width="20%">
      <Typography variant="body2" component="samp" whiteSpace="nowrap">
        ADD TO CARD
      </Typography>
      <List sx={{ padding: "5px" }}>
        <ListItem>
          <Button
            variant="contained"
            size="small"
            startIcon={<MdLabelOutline />}
            onClick={handleMenuOpen}
          >
            Labels
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {cardLabels.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClick(item);
                  handleMenuClose();
                }}
                sx={{
                  backgroundColor: item.bg,
                  marginBottom: "5px",
                  minHeight: "20px",
                }}
              >
                <Box minHeight="20px"></Box>
              </MenuItem>
            ))}
          </Menu>
        </ListItem>
      </List>
    </Box>
  );
};

export default CardLabel;
