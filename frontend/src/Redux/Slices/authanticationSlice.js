import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//fetch already loggedin user (by cookies) =========================================================
export const fetchLoggedInUser = createAsyncThunk(
  "fetchloggedin/user",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/isauthanticate`,
      {
        method: "post",
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.success) {
      return result.user;
    } else {
      return false;
    }
  }
);

//login user =======================================================================================
export const login = createAsyncThunk("login", async (user) => {
  const { email, password } = user;
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signin`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({email, password}),
  });
  const response=await res.json();
  if(response.success){
    toast.success(response.message);
    return response.user;
  }else{
    toast.error(response.message);
    return null
  }
  
  // return 
  // await axios
  //   .post(
  //     `${process.env.REACT_APP_BACKEND_URL}/user/signin`,
  //     { email, password },
  //     { withCredentials: true }
  //   )
  //   .then((response) => {
  //     if (response.data) {
  //       toast.success(response.data.message);
  //       return response.data.user;
  //     }
  //   })
  //   .catch((error) => {
  //     toast.error(error.response.data.message);
  //   });
});

//update user ========================================================================================================
export const updateUser = createAsyncThunk("updateUser", async (value) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/user/update`,
    {
      method: "post",
      headers: {
        // "Content-Type": "application/json",  ///remove this line for formdata upload
        Accept: "application/json",
      },
      body: value,credentials: "include"});
        
        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }

        return result.user;
});


//logout ==============================================================================================================
export const logout = createAsyncThunk("logout", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/user/logout`,
    {
      method: "post",
      credentials: "include",
    }
  );
  const result = await response.json();
  if (result.success) {
    toast.success(result.message);
  }
  return result.success;
});

// functions =====================================================================================================
const insertIntoState = (state, action) => {
  const {_id,name,email,mobile,role,photo,gender,address_line1,address_line2,address_houseNumber,address_landMark,address_pinCode,address_state,address_district,address_subDistrict} = action.payload;

  state.id = _id;
  state.name = name;
  state.email = email;
  state.photo=photo;
  state.mobile = mobile;
  state.role = role;
  state.gender = gender ? gender : "";
  state.address.line1 = address_line1 ? address_line1 : "-";
  state.address.line2 = address_line2 ? address_line2 : "-";
  state.address.houseNumber = address_houseNumber ? address_houseNumber : "-";
  state.address.landmark = address_landMark ? address_landMark : "-";
  state.address.pincode = address_pinCode ? Number(address_pinCode) : 0;
  state.address.state = address_state ? address_state : "-";
  state.address.district = address_district ? address_district : "-";
  state.address.subDistrict = address_subDistrict ? address_subDistrict : "-";
};

//slice start
const Authantication = createSlice({
  name: "auth",
  initialState: {
    id: "",
    name: "",
    email: "",
    gender: "",
    mobile: "",
    role: "",
    address: { line1: "",
                line2: "",
                houseNumber: "",
                landmark: "",
                pincode: 0,
                state: "",
                district: "",
                subDistrict: ""},
  },
  reducers: {},
  
  //extra reducer use for manage async request
  extraReducers: (builder) => {
    builder.addCase(fetchLoggedInUser.fulfilled, insertIntoState);
    builder.addCase(
      fetchLoggedInUser.rejected,
      (state, action) => (state = { ...state })
    );
    builder.addCase(login.fulfilled, insertIntoState);
    builder.addCase(updateUser.fulfilled, (state, action)=>action.payload && insertIntoState(state, action));
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload) {
        state.id = "";
        state.email = "";
        state.name = "";
        state.role = "";
      }
    });
  },
});
export default Authantication.reducer;
