import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise<GeolocationPosition>(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

interface IPosition {
  position: {
    latitude?: number | string | undefined;
    longitude?: number | string | undefined;
  };
}

export interface IReturnFetchAddresData extends IPosition {
  address: string;
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  console.log(positionObj);
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address } as IReturnFetchAddresData;
});

interface IInitialState extends IReturnFetchAddresData {
  userName: string;
  status: "idle" | "loading" | "error";
  error?: string;
}

const initialState: IInitialState = {
  userName: "",
  status: "idle",
  position: {},
  error: "",
  address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "idle";
      state.position = action.payload.position;
      state.address = action.payload.address;
    });
    builder.addCase(fetchAddress.rejected, (state) => {
      (state.status = "error"),
        (state.error =
          "there was a problem getting your address. Make sure to fill this field!");
    });
  },
});
export const { updateName } = userSlice.actions;

export default userSlice.reducer;
