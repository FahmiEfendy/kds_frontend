import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import initialMenus from "../data/menus.json";

type Menu = {
  id: string;
  name: string;
};

type Group = {
  id: string;
  name: string;
  menuList: Menu[];
};

type GroupsState = {
  menus: Group[];
  selectedGroupId: string | null;
};

const initialState: GroupsState = {
  menus: initialMenus,
  selectedGroupId: null,
};

const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<string>) => {
      state.menus.push({
        id: `group-menu-${uuidv4()}`,
        name: action.payload,
        menuList: [],
      });
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      state.menus = state.menus.filter((m) => m.id !== action.payload);
      // reset selected group if selected group === deleted group
      if (state.selectedGroupId === action.payload) {
        state.selectedGroupId = null;
      }
    },
    selectGroup: (state, action: PayloadAction<string | null>) => {
      state.selectedGroupId = action.payload;
    },
    addMenu: (
      state,
      action: PayloadAction<{ groupId: string; name: string }>
    ) => {
      const group = state.menus.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.menuList.push({
          id: `menu-${uuidv4()}`,
          name: action.payload.name,
        });
      }
    },
    deleteMenu: (
      state,
      action: PayloadAction<{ groupId: string; menuId: string }>
    ) => {
      const group = state.menus.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.menuList = group.menuList.filter(
          (m) => m.id !== action.payload.menuId
        );
      }
    },
  },
});

export const { addGroup, deleteGroup, selectGroup, addMenu, deleteMenu } =
  menusSlice.actions;

export default menusSlice.reducer;
