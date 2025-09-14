import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { RootState } from "../../store";
import Navbar from "../../components/navbar";
import {
  addGroup,
  addMenu,
  deleteGroup,
  deleteMenu,
  selectGroup,
} from "../../store/menusSlice";

const SettingPage = () => {
  const dispatch = useDispatch();

  const [inputMenu, setInputMenu] = useState("");
  const [inputGroup, setInputGroup] = useState("");

  const { menus, selectedGroupId } = useSelector(
    (state: RootState) => state.menus
  );

  const addGroupHandler = () => {
    if (inputGroup) {
      dispatch(addGroup(inputGroup));
      setInputGroup("");
    }
  };

  const deleteGroupHandler = (id: string) => {
    dispatch(deleteGroup(id));
  };

  const selectGroupHandler = (id: string) => {
    dispatch(selectGroup(id));
  };

  const addMenuHandler = () => {
    if (selectedGroupId && inputMenu) {
      dispatch(addMenu({ groupId: selectedGroupId, name: inputMenu }));
      setInputMenu("");
    }
  };

  const deleteMenuHandler = (groupId: string, menuId: string) => {
    dispatch(deleteMenu({ groupId: groupId, menuId: menuId }));
  };

  return (
    <>
      <Navbar />
      <Container sx={{ padding: "2rem" }}>
        {/* Menu Group */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ padding: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                Menu Groups
              </Typography>

              {/* Add New Menu Group */}
              <Box gap={2} sx={{ display: "flex", marginBottom: ".5rem" }}>
                <TextField
                  label="Group Name"
                  placeholder="Enter group name..."
                  value={inputGroup}
                  onChange={(e) => setInputGroup(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" onClick={addGroupHandler}>
                  Add
                </Button>
              </Box>

              {/* List Menu Group */}
              <List>
                {menus.map((menu) => (
                  <ListItem
                    key={menu.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => deleteGroupHandler(menu.id)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      selected={selectedGroupId === menu.id}
                      onClick={() => selectGroupHandler(menu.id)}
                    >
                      <ListItemText primary={menu.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {menus.length === 0 && (
                  <Typography color="text.secondary" variant="body2">
                    No menu group found. Please add a new one
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>

          {/* Menus */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ padding: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                Menus
              </Typography>

              {/* Select Menu Group */}
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Select Group</InputLabel>
                <Select
                  value={selectedGroupId || ""}
                  label="Select Group"
                  onChange={(e) => selectGroupHandler(e.target.value || "")}
                >
                  {menus.map((menu) => (
                    <MenuItem key={menu.id} value={menu.id}>
                      {menu.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Add New Menu */}
              <Box gap={2} sx={{ display: "flex", marginBottom: "1rem" }}>
                <TextField
                  label="Menu Name"
                  placeholder="Enter menu name..."
                  value={inputMenu}
                  onChange={(e) => setInputMenu(e.target.value)}
                  fullWidth
                  disabled={!selectedGroupId} // will be enabled if a group selected
                />
                <Button
                  variant="contained"
                  onClick={addMenuHandler}
                  disabled={!selectedGroupId}
                >
                  Add
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* List Menus Under Selected Group */}
              {selectedGroupId ? (
                <List>
                  {menus
                    .find((m) => m.id === selectedGroupId)
                    ?.menuList.map((list) => (
                      <ListItem
                        key={list.id}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() =>
                              deleteMenuHandler(selectedGroupId, list.id)
                            }
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={list.name} />
                      </ListItem>
                    ))}
                  {menus.find((m) => m.id === selectedGroupId)?.menuList
                    .length === 0 && (
                    <Typography color="text.secondary" variant="body2">
                      No menu found. Please add a new one
                    </Typography>
                  )}
                </List>
              ) : (
                <Typography color="text.secondary" variant="body2">
                  Select a group to manage its menus.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SettingPage;
